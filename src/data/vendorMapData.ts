export interface VendorPoint {
  id: number
  name: string
  lat: number
  lng: number
  claims: number
  province: string
}

export const vendorMapData: VendorPoint[] = [
  // British Columbia
  { id: 1, name: "Circle K Vancouver", lat: 49.2827, lng: -123.1207, claims: 245, province: "BC" },
  { id: 2, name: "Petro-Canada Surrey", lat: 49.1913, lng: -122.8490, claims: 189, province: "BC" },
  { id: 3, name: "Shell Victoria", lat: 48.4284, lng: -123.3656, claims: 156, province: "BC" },
  { id: 4, name: "7-Eleven Burnaby", lat: 49.2488, lng: -122.9805, claims: 98, province: "BC" },
  { id: 5, name: "Esso Richmond", lat: 49.1666, lng: -123.1336, claims: 134, province: "BC" },

  // Alberta
  { id: 6, name: "Circle K Calgary", lat: 51.0447, lng: -114.0719, claims: 312, province: "AB" },
  { id: 7, name: "Petro-Canada Edmonton", lat: 53.5461, lng: -113.4938, claims: 278, province: "AB" },
  { id: 8, name: "Shell Red Deer", lat: 52.2681, lng: -113.8112, claims: 167, province: "AB" },
  { id: 9, name: "7-Eleven Lethbridge", lat: 49.6939, lng: -112.8418, claims: 89, province: "AB" },
  { id: 10, name: "Esso Medicine Hat", lat: 50.0414, lng: -110.6788, claims: 76, province: "AB" },

  // Saskatchewan
  { id: 11, name: "Circle K Saskatoon", lat: 52.1579, lng: -106.6702, claims: 198, province: "SK" },
  { id: 12, name: "Petro-Canada Regina", lat: 50.4452, lng: -104.6189, claims: 145, province: "SK" },
  { id: 13, name: "Shell Prince Albert", lat: 53.2031, lng: -105.7531, claims: 67, province: "SK" },
  { id: 14, name: "7-Eleven Moose Jaw", lat: 50.3933, lng: -105.5359, claims: 54, province: "SK" },

  // Manitoba
  { id: 15, name: "Circle K Winnipeg", lat: 49.8951, lng: -97.1384, claims: 234, province: "MB" },
  { id: 16, name: "Petro-Canada Brandon", lat: 49.8483, lng: -99.9500, claims: 123, province: "MB" },
  { id: 17, name: "Shell Thompson", lat: 55.7431, lng: -97.8558, claims: 45, province: "MB" },

  // Ontario
  { id: 18, name: "Circle K Toronto", lat: 43.6532, lng: -79.3832, claims: 456, province: "ON" },
  { id: 19, name: "Petro-Canada Ottawa", lat: 45.4215, lng: -75.6972, claims: 289, province: "ON" },
  { id: 20, name: "Shell Hamilton", lat: 43.2557, lng: -79.8711, claims: 234, province: "ON" },
  { id: 21, name: "7-Eleven London", lat: 42.9849, lng: -81.2453, claims: 178, province: "ON" },
  { id: 22, name: "Esso Windsor", lat: 42.3149, lng: -83.0364, claims: 156, province: "ON" },
  { id: 23, name: "Circle K Kitchener", lat: 43.4516, lng: -80.4925, claims: 134, province: "ON" },
  { id: 24, name: "Petro-Canada Mississauga", lat: 43.5890, lng: -79.6441, claims: 267, province: "ON" },

  // Quebec
  { id: 25, name: "Circle K Montreal", lat: 45.5017, lng: -73.5673, claims: 378, province: "QC" },
  { id: 26, name: "Petro-Canada Quebec City", lat: 46.8139, lng: -71.2080, claims: 234, province: "QC" },
  { id: 27, name: "Shell Laval", lat: 45.6066, lng: -73.7124, claims: 189, province: "QC" },
  { id: 28, name: "7-Eleven Gatineau", lat: 45.4773, lng: -75.7013, claims: 123, province: "QC" },

  // Maritime Provinces
  { id: 29, name: "Circle K Halifax", lat: 44.6488, lng: -63.5752, claims: 167, province: "NS" },
  { id: 30, name: "Petro-Canada Saint John", lat: 45.2733, lng: -66.0633, claims: 98, province: "NB" }
]
