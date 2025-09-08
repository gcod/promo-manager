import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, PieChart, Users, TrendingUp } from "lucide-react"

// Types
type Province = {
  name: string
  code: string
  claims: number
  percentage: number
  promotions?: Promotion[]
}

type Promotion = {
  name: string
  claims: number
}

type Vendor = {
  id: number
  name: string
  color: string
  totalClaims: number
  percentage: number
  provinces: Province[]
  promotions: Promotion[]
}

// Mock data for vendor stats
const vendorStats = [
  {
    id: 1,
    name: "Circle K",
    color: "#3B82F6", // Blue
    totalClaims: 2156,
    percentage: 22.7,
    provinces: [
      { 
        name: "Ontario", 
        code: "ON", 
        claims: 1200, 
        percentage: 55.7,
        promotions: [
          { name: "ProOne", claims: 700 },
          { name: "Pods", claims: 350 },
          { name: "Ultra", claims: 150 }
        ]
      },
      { 
        name: "British Columbia", 
        code: "BC", 
        claims: 650, 
        percentage: 30.1,
        promotions: [
          { name: "ProOne", claims: 400 },
          { name: "Pods", claims: 200 },
          { name: "Ultra", claims: 50 }
        ]
      },
      { 
        name: "Alberta", 
        code: "AB", 
        claims: 306, 
        percentage: 14.2,
        promotions: [
          { name: "ProOne", claims: 200 },
          { name: "Pods", claims: 80 },
          { name: "Ultra", claims: 26 }
        ]
      }
    ],
    promotions: [
      { name: "ProOne", claims: 1200 },
      { name: "Pods", claims: 650 },
      { name: "Ultra", claims: 306 }
    ]
  },
  {
    id: 2,
    name: "Petro-Canada",
    color: "#EF4444", // Red
    totalClaims: 1890,
    percentage: 19.9,
    provinces: [
      { 
        name: "British Columbia", 
        code: "BC", 
        claims: 950, 
        percentage: 50.3,
        promotions: [
          { name: "ProOne", claims: 500 },
          { name: "Pods", claims: 300 },
          { name: "Ultra", claims: 150 }
        ]
      },
      { 
        name: "Alberta", 
        code: "AB", 
        claims: 600, 
        percentage: 31.7,
        promotions: [
          { name: "ProOne", claims: 350 },
          { name: "Pods", claims: 150 },
          { name: "Ultra", claims: 100 }
        ]
      },
      { 
        name: "Ontario", 
        code: "ON", 
        claims: 340, 
        percentage: 18.0,
        promotions: [
          { name: "ProOne", claims: 200 },
          { name: "Pods", claims: 100 },
          { name: "Ultra", claims: 40 }
        ]
      }
    ],
    promotions: [
      { name: "ProOne", claims: 950 },
      { name: "Pods", claims: 600 },
      { name: "Ultra", claims: 340 }
    ]
  },
  {
    id: 3,
    name: "Shell",
    color: "#F59E0B", // Amber
    totalClaims: 1650,
    percentage: 17.4,
    provinces: [
      { 
        name: "Alberta", 
        code: "AB", 
        claims: 800, 
        percentage: 48.5,
        promotions: [
          { name: "ProOne", claims: 450 },
          { name: "Pods", claims: 250 },
          { name: "Ultra", claims: 100 }
        ]
      },
      { 
        name: "Saskatchewan", 
        code: "SK", 
        claims: 450, 
        percentage: 27.3,
        promotions: [
          { name: "ProOne", claims: 250 },
          { name: "Pods", claims: 150 },
          { name: "Ultra", claims: 50 }
        ]
      },
      { 
        name: "British Columbia", 
        code: "BC", 
        claims: 400, 
        percentage: 24.2,
        promotions: [
          { name: "ProOne", claims: 200 },
          { name: "Pods", claims: 120 },
          { name: "Ultra", claims: 80 }
        ]
      }
    ],
    promotions: [
      { name: "ProOne", claims: 800 },
      { name: "Pods", claims: 450 },
      { name: "Ultra", claims: 400 }
    ]
  },
  {
    id: 4,
    name: "Parkland",
    color: "#10B981", // Emerald
    totalClaims: 1420,
    percentage: 14.9,
    provinces: [
      { 
        name: "Manitoba", 
        code: "MB", 
        claims: 750, 
        percentage: 52.8,
        promotions: [
          { name: "ProOne", claims: 400 },
          { name: "Pods", claims: 250 },
          { name: "Ultra", claims: 100 }
        ]
      },
      { 
        name: "Ontario", 
        code: "ON", 
        claims: 400, 
        percentage: 28.2,
        promotions: [
          { name: "ProOne", claims: 200 },
          { name: "Pods", claims: 150 },
          { name: "Ultra", claims: 50 }
        ]
      },
      { 
        name: "New Brunswick", 
        code: "NB", 
        claims: 270, 
        percentage: 19.0,
        promotions: [
          { name: "ProOne", claims: 150 },
          { name: "Pods", claims: 80 },
          { name: "Ultra", claims: 40 }
        ]
      }
    ],
    promotions: [
      { name: "ProOne", claims: 750 },
      { name: "Pods", claims: 400 },
      { name: "Ultra", claims: 270 }
    ]
  },
  {
    id: 5,
    name: "711",
    color: "#8B5CF6", // Violet
    totalClaims: 980,
    percentage: 10.3,
    provinces: [
      { 
        name: "Alberta", 
        code: "AB", 
        claims: 500, 
        percentage: 51.0,
        promotions: [
          { name: "ProOne", claims: 300 },
          { name: "Pods", claims: 150 },
          { name: "Ultra", claims: 50 }
        ]
      },
      { 
        name: "Saskatchewan", 
        code: "SK", 
        claims: 300, 
        percentage: 30.6,
        promotions: [
          { name: "ProOne", claims: 180 },
          { name: "Pods", claims: 80 },
          { name: "Ultra", claims: 40 }
        ]
      },
      { 
        name: "Manitoba", 
        code: "MB", 
        claims: 180, 
        percentage: 18.4,
        promotions: [
          { name: "ProOne", claims: 100 },
          { name: "Pods", claims: 50 },
          { name: "Ultra", claims: 30 }
        ]
      }
    ],
    promotions: [
      { name: "ProOne", claims: 500 },
      { name: "Pods", claims: 300 },
      { name: "Ultra", claims: 180 }
    ]
  }
]

const allPromotions = [
  { id: 1, name: "ProOne" },
  { id: 2, name: "Pods" },
  { id: 3, name: "Ultra" },
  { id: 4, name: "2x Ultra PODS" },
  { id: 99, name: "Evergreen" }
]

// Pie Chart Component
const PieChartComponent = ({ data, onSegmentClick }: { data: Vendor[], onSegmentClick?: (item: Vendor) => void }) => {
  const total = data.reduce((sum, item) => sum + item.totalClaims, 0)
  let cumulativePercentage = 0

  return (
    <div className="relative w-80 h-80 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {data.map((item, index) => {
          const percentage = (item.totalClaims / total) * 100
          const startAngle = (cumulativePercentage / 100) * 360
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360
          
          const startAngleRad = (startAngle - 90) * (Math.PI / 180)
          const endAngleRad = (endAngle - 90) * (Math.PI / 180)
          
          const largeArcFlag = percentage > 50 ? 1 : 0
          
          const x1 = 100 + 80 * Math.cos(startAngleRad)
          const y1 = 100 + 80 * Math.sin(startAngleRad)
          const x2 = 100 + 80 * Math.cos(endAngleRad)
          const y2 = 100 + 80 * Math.sin(endAngleRad)
          
          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ')
          
          cumulativePercentage += percentage
          
          return (
            <g key={item.id}>
              <path
                d={pathData}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onSegmentClick?.(item)}
              />
              <title>
                {item.name}
                {`\nTotal Claims: ${item.totalClaims.toLocaleString()}`}
                {item.promotions.map(promo => `\n${promo.name}: ${promo.claims.toLocaleString()} claims`).join('')}
              </title>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Province Pie Chart Component
const ProvincePieChartComponent = ({ data }: { data: Province[] }) => {
  const total = data.reduce((sum, item) => sum + item.claims, 0)
  let cumulativePercentage = 0

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {data.map((item, index) => {
          const percentage = (item.claims / total) * 100
          const startAngle = (cumulativePercentage / 100) * 360
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360
          
          const startAngleRad = (startAngle - 90) * (Math.PI / 180)
          const endAngleRad = (endAngle - 90) * (Math.PI / 180)
          
          const largeArcFlag = percentage > 50 ? 1 : 0
          
          const x1 = 100 + 70 * Math.cos(startAngleRad)
          const y1 = 100 + 70 * Math.sin(startAngleRad)
          const x2 = 100 + 70 * Math.cos(endAngleRad)
          const y2 = 100 + 70 * Math.sin(endAngleRad)
          
          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ')
          
          // Generate colors for provinces
          const colors = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16']
          const color = colors[index % colors.length]
          
          cumulativePercentage += percentage
          
          return (
            <g key={item.code}>
              <path
                d={pathData}
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <title>
                {item.name} ({item.code})
                {`\nTotal Claims: ${item.claims.toLocaleString()}`}
                {`\nPercentage: ${item.percentage}%`}
                {item.promotions?.map(promo => `\n${promo.name}: ${promo.claims.toLocaleString()} claims`).join('') || ''}
              </title>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function VendorStats() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [selectedPromotion, setSelectedPromotion] = useState("all")

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor)
  }

  const handleBackToVendors = () => {
    setSelectedVendor(null)
    setSelectedPromotion("all")
  }

  const getMaxClaims = (data: Province[]) => {
    return Math.max(...data.map(item => item.claims))
  }

  const getMaxVendorClaims = (data: Vendor[]) => {
    return Math.max(...data.map(item => item.totalClaims))
  }

  const getFilteredProvinceData = (): Province[] => {
    if (!selectedVendor) return []
    
    if (selectedPromotion === "all") {
      return selectedVendor.provinces
    }
    
    // Filter by promotion (mock data - in real app this would come from API)
    return selectedVendor.provinces.map(province => ({
      ...province,
      claims: Math.floor(province.claims * (Math.random() * 0.3 + 0.7)) // Mock filtered data
    }))
  }

  if (selectedVendor) {
    const filteredData = getFilteredProvinceData()
    const maxClaims = getMaxClaims(filteredData)

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleBackToVendors}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Vendors
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{selectedVendor.name} - Province Breakdown</h1>
            <p className="text-muted-foreground">
              Claims distribution across provinces for {selectedVendor.name}
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Filter by Promotion:</span>
            <Select value={selectedPromotion} onValueChange={setSelectedPromotion}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Promotions</SelectItem>
                {allPromotions.map(promotion => (
                  <SelectItem key={promotion.id} value={promotion.name}>
                    {promotion.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

         <div className="grid gap-6 md:grid-cols-2">
           <Card className="shadow-card">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <PieChart className="h-5 w-5 text-primary" />
                 Claims by Province
               </CardTitle>
             </CardHeader>
             <CardContent>
               <ProvincePieChartComponent data={filteredData} />
             </CardContent>
           </Card>

           <Card className="shadow-card">
             <CardHeader>
               <CardTitle className="flex items-center gap-2">
                 <Users className="h-5 w-5 text-accent" />
                 Province Breakdown
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="space-y-4">
                 {filteredData.map((province, index) => {
                   const colors = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16']
                   const color = colors[index % colors.length]
                   
                   return (
                     <div key={province.code} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                       <div className="flex items-center gap-3">
                         <div 
                           className="w-4 h-4 rounded-full"
                           style={{ backgroundColor: color }}
                         />
                         <div>
                           <div className="font-medium">{province.name}</div>
                           <Badge variant="outline" className="text-xs">{province.code}</Badge>
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="font-bold text-foreground">{province.claims.toLocaleString()}</div>
                         <div className="text-sm text-muted-foreground">{province.percentage}%</div>
                       </div>
                     </div>
                   )
                 })}
               </div>
             </CardContent>
           </Card>
         </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Total Claims
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">
                  {selectedVendor.totalClaims.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedVendor.percentage}% of all vendor claims
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Top Province
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-2">
                  {filteredData[0]?.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {filteredData[0]?.claims.toLocaleString()} claims ({filteredData[0]?.percentage}%)
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const maxVendorClaims = getMaxVendorClaims(vendorStats)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Statistics</h1>
          <p className="text-muted-foreground">
            Total claims and performance metrics by vendor
          </p>
        </div>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
         <Card className="shadow-card">
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <PieChart className="h-5 w-5 text-primary" />
               Vendor Claims Distribution
             </CardTitle>
           </CardHeader>
           <CardContent>
             <PieChartComponent data={vendorStats} onSegmentClick={handleVendorClick} />
           </CardContent>
         </Card>

         <Card className="shadow-card">
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Users className="h-5 w-5 text-accent" />
               Vendor Details
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="space-y-4">
               {vendorStats.map((vendor) => (
                 <div 
                   key={vendor.id} 
                   className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                   onClick={() => handleVendorClick(vendor)}
                 >
                   <div className="flex items-center gap-3">
                     <div 
                       className="w-4 h-4 rounded-full"
                       style={{ backgroundColor: vendor.color }}
                     />
                     <div>
                       <div className="font-semibold text-foreground">{vendor.name}</div>
                       <div className="text-sm text-muted-foreground">
                         {vendor.provinces.length} provinces • {vendor.promotions.length} promotions
                       </div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="font-bold text-foreground">
                       {vendor.totalClaims.toLocaleString()}
                     </div>
                     <div className="text-sm text-muted-foreground">
                       {vendor.percentage}%
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </CardContent>
         </Card>
       </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-accent" />
              Total Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                {vendorStats.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Active vendor partners
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Total Claims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">
                {vendorStats.reduce((sum, vendor) => sum + vendor.totalClaims, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                Across all vendors
              </div>
            </div>
          </CardContent>
        </Card>

         <Card className="shadow-card">
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <PieChart className="h-5 w-5 text-primary" />
               Top Performer
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className="text-center">
               <div className="text-2xl font-bold text-foreground mb-2">
                 {vendorStats[0]?.name}
               </div>
               <div className="text-sm text-muted-foreground">
                 {vendorStats[0]?.totalClaims.toLocaleString()} claims
               </div>
             </div>
           </CardContent>
         </Card>
      </div>
    </div>
  )
}
