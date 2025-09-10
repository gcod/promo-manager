import React, { useEffect, useMemo, useRef, useState } from 'react'

interface VendorPoint {
  id: number
  name: string
  lat: number
  lng: number
  claims: number
  province: string
}

interface CanadaMapProps {
  vendors: VendorPoint[]
}

export function CanadaMap({ vendors }: CanadaMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const transformedLayerRef = useRef<SVGGElement | null>(null)

  const [mapPathsMarkup, setMapPathsMarkup] = useState<string>("")
  const [mapTransform, setMapTransform] = useState<string>("")
  const [computedViewBox, setComputedViewBox] = useState<string>("")
  const [hover, setHover] = useState<{
    vendor: VendorPoint
    x: number
    y: number
  } | null>(null)

  // Load and filter the external canada.svg so only desired provinces are shown
  useEffect(() => {
    const allowedIds = new Set([
      'CA-AB', // Alberta
      'CA-BC', // British Columbia
      'CA-MB', // Manitoba
      'CA-NB', // New Brunswick
      'CA-NS', // Nova Scotia
      'CA-ON', // Ontario
      'CA-PE', // Prince Edward Island
      'CA-SK', // Saskatchewan
    ])

    const loadSvg = async () => {
      try {
        const res = await fetch('/canada.svg')
        const text = await res.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'image/svg+xml')
        const paths = Array.from(doc.querySelectorAll('path'))

        const container = doc.createElementNS('http://www.w3.org/2000/svg', 'g')

        paths.forEach((p) => {
          const id = p.getAttribute('id') || ''
          if (allowedIds.has(id)) {
            const clone = p.cloneNode(true) as SVGPathElement
            clone.setAttribute('fill', '#e5e7eb')
            clone.setAttribute('stroke', '#9ca3af')
            clone.setAttribute('stroke-width', '1')
            container.appendChild(clone)
          }
        })

        // Serialize kept paths into markup we can inject
        const wrapper = document.createElement('div')
        wrapper.appendChild(container)
        setMapPathsMarkup(wrapper.innerHTML)
      } catch (e) {
        // Fail silently; leave markup empty
        setMapPathsMarkup('')
      }
    }

    loadSvg()
  }, [])

  // After paths mount, compute a tight viewBox that fits BC→ON (fills width)
  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl) return
    // wait a frame so the innerHTML is rendered
    const id = requestAnimationFrame(() => {
      const layer = svgEl.querySelector('#mapLayer') as SVGGElement | null
      if (!layer) return
      try {
        const fitIds = new Set(['CA-BC','CA-AB','CA-SK','CA-MB','CA-ON'])
        const paths = Array.from(layer.querySelectorAll('path'))
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
        paths.forEach(p => {
          const id = p.getAttribute('id') || ''
          if (!fitIds.has(id)) return
          const b = p.getBBox()
          minX = Math.min(minX, b.x)
          minY = Math.min(minY, b.y)
          maxX = Math.max(maxX, b.x + b.width)
          maxY = Math.max(maxY, b.y + b.height)
        })
        if (isFinite(minX) && isFinite(maxX)) {
          const padX = 0
          const padY = 24
          const x = Math.max(0, minX - padX)
          const y = Math.max(0, minY - padY)
          const width = maxX - minX + padX * 2
          const height = maxY - minY + padY * 2
          setComputedViewBox(`${x} ${y} ${width} ${height}`)
        } else {
          setComputedViewBox('')
        }
        // no extra transform needed when using viewBox fitting
        setMapTransform('')
      } catch (err) {
        setComputedViewBox('')
      }
    })
    return () => cancelAnimationFrame(id)
  }, [mapPathsMarkup])
  // Calculate point size based on claims (min 8px, max 28px)
  const getPointSize = (claims: number) => {
    const minSize = 8
    const maxSize = 28
    const maxClaims = Math.max(...vendors.map(v => v.claims))
    return minSize + (claims / maxClaims) * (maxSize - minSize)
  }

  // Convert lat/lng to SVG coordinates based on the actual SVG viewBox
  const latToY = (lat: number) => {
    const minLat = 41.730628
    const maxLat = 83.116658
    const svgHeight = 1030.8354
    return svgHeight - ((lat - minLat) / (maxLat - minLat)) * svgHeight
  }

  const lngToX = (lng: number) => {
    const minLng = -141.007366
    const maxLng = -52.648425
    const svgWidth = 792.48273
    return ((lng - minLng) / (maxLng - minLng)) * svgWidth
  }

  return (
    <div ref={containerRef} className="w-full max-w-full h-[800px] bg-gray-50 rounded-lg border overflow-hidden relative">
      <svg
        ref={svgRef}
        viewBox={computedViewBox || '0 0 792.48273 1030.8354'}
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
      >
        {/* Render map and points inside same transform so they stay aligned */}
        <g ref={transformedLayerRef} transform={mapTransform}>
          {/* Filtered SVG paths (excluding NU, NT, YT, QC, NL) */}
          <g id="mapLayer" dangerouslySetInnerHTML={{ __html: mapPathsMarkup }} />

        {/* Vendor points */}
        {vendors.map((vendor) => {
          const x = lngToX(vendor.lng)
          const y = latToY(vendor.lat)
          const size = getPointSize(vendor.claims)
          
          return (
            <g key={vendor.id}>
              <circle
                cx={x}
                cy={y}
                r={size / 2}
                fill="#3b82f6"
                stroke="#1e40af"
                strokeWidth="2"
                className="hover:fill-blue-600 transition-colors cursor-pointer"
                onMouseEnter={(e) => {
                  const svgEl = svgRef.current
                  const layer = transformedLayerRef.current
                  if (!svgEl || !layer) return
                  const container = containerRef.current
                  const rect = container?.getBoundingClientRect()
                  if (!rect) return
                  setHover({ vendor, x: e.clientX - rect.left, y: e.clientY - rect.top })
                }}
                onMouseMove={(e) => {
                  const svgEl = svgRef.current
                  const layer = transformedLayerRef.current
                  if (!svgEl || !layer) return
                  const container = containerRef.current
                  const rect = container?.getBoundingClientRect()
                  if (!rect) return
                  setHover({ vendor, x: e.clientX - rect.left, y: e.clientY - rect.top })
                }}
                onMouseLeave={() => setHover(null)}
              >
                <title>
                  {vendor.name} - {vendor.claims} claims - {vendor.province}
                </title>
              </circle>
            </g>
          )
        })}
        </g>

        {/* Legend */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="250" height="140" fill="white" fillOpacity="0.95" rx="8" />
          <text x="15" y="25" fontSize="18" fontWeight="bold" fill="#374151">
            Vendor Claims
          </text>
          <text x="15" y="45" fontSize="14" fill="#6b7280">
            Point size represents claim volume
          </text>
          
          <circle cx="25" cy="70" r="4" fill="#3b82f6" />
          <text x="40" y="76" fontSize="13" fill="#374151">Low (1-50)</text>
          
          <circle cx="25" cy="95" r="7" fill="#3b82f6" />
          <text x="40" y="101" fontSize="13" fill="#374151">Medium (51-150)</text>
          
          <circle cx="25" cy="120" r="12" fill="#3b82f6" />
          <text x="40" y="126" fontSize="13" fill="#374151">High (151+)</text>
        </g>
      </svg>

      {/* Hover tooltip overlay */}
      {hover && (
        <div
          style={{
            position: 'absolute',
            left: Math.min(Math.max(hover.x + 14, 8), (containerRef.current?.clientWidth || 0) - 260),
            top: Math.min(Math.max(hover.y + 14, 8), (containerRef.current?.clientHeight || 0) - 120),
          }}
          className="pointer-events-none bg-white rounded-md shadow-lg border p-3 w-[240px] text-sm"
        >
          <div className="font-semibold text-foreground mb-1">{hover.vendor.name}</div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Province</span>
            <span className="font-medium text-foreground">{hover.vendor.province}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Claims</span>
            <span className="font-bold text-foreground">{hover.vendor.claims.toLocaleString()}</span>
          </div>
          <div className="mt-2 h-1.5 bg-muted rounded">
            <div
              className="h-1.5 bg-blue-500 rounded"
              style={{ width: `${Math.min(100, (hover.vendor.claims / Math.max(...vendors.map(v => v.claims))) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
