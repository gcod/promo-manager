import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/StatusBadge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Filter, Package, Image } from "lucide-react"

// Mock data
const offers = [
  {
    id: 1,
    promotion: "Black Friday Special",
    price: "$29.99",
    format: "UPC",
    province: "ON",
    vendor: "VendorCorp",
    status: "active" as const,
    hasImages: true,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    promotion: "Holiday Bundle",
    price: "$15.50",
    format: "Token",
    province: "BC", 
    vendor: "RetailPlus",
    status: "active" as const,
    hasImages: false,
    createdAt: "2024-01-12"
  },
  {
    id: 3,
    promotion: "New Year Teaser",
    price: "$45.00",
    format: "UPC",
    province: "AB",
    vendor: "ShopMart",
    status: "inactive" as const,
    hasImages: true,
    createdAt: "2024-01-10"
  }
]

const provinces = ["All Provinces", "ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "NL", "PE", "NT", "NU", "YT"]
const statuses = ["All Status", "Active", "Inactive"]

export default function Offers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("All Provinces")
  const [selectedStatus, setSelectedStatus] = useState("All Status")

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.promotion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProvince = selectedProvince === "All Provinces" || offer.province === selectedProvince
    const matchesStatus = selectedStatus === "All Status" || 
                         (selectedStatus === "Active" && offer.status === "active") ||
                         (selectedStatus === "Inactive" && offer.status === "inactive")
    
    return matchesSearch && matchesProvince && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Offers</h1>
          <p className="text-muted-foreground">
            Manage offers across promotions, vendors, and provinces
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Offer
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            All Offers
          </CardTitle>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map(province => (
                  <SelectItem key={province} value={province}>{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promotion</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.promotion}</TableCell>
                  <TableCell className="font-mono text-success">{offer.price}</TableCell>
                  <TableCell>
                    <Badge variant={offer.format === 'UPC' ? 'outline' : 'secondary'}>
                      {offer.format}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{offer.province}</Badge>
                  </TableCell>
                  <TableCell>{offer.vendor}</TableCell>
                  <TableCell>
                    {offer.hasImages ? (
                      <Image className="h-4 w-4 text-success" />
                    ) : (
                      <Image className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={offer.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(offer.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}