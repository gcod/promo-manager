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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Filter, Package, Edit } from "lucide-react"

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<any>(null)
  const [formData, setFormData] = useState({
    promotion: "",
    price: "",
    format: "UPC",
    province: "",
    vendor: "",
    status: true,
    description: "",
    termsConditions: ""
  })

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.promotion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.vendor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProvince = selectedProvince === "All Provinces" || offer.province === selectedProvince
    const matchesStatus = selectedStatus === "All Status" || 
                         (selectedStatus === "Active" && offer.status === "active") ||
                         (selectedStatus === "Inactive" && offer.status === "inactive")
    
    return matchesSearch && matchesProvince && matchesStatus
  })

  const handleCreateOffer = () => {
    setEditingOffer(null)
    setFormData({
      promotion: "",
      price: "",
      format: "UPC",
      province: "",
      vendor: "",
      status: true,
      description: "",
      termsConditions: ""
    })
    setIsDialogOpen(true)
  }

  const handleEditOffer = (offer: any) => {
    setEditingOffer(offer)
    setFormData({
      promotion: offer.promotion,
      price: offer.price,
      format: offer.format,
      province: offer.province,
      vendor: offer.vendor,
      status: offer.status === "active",
      description: "",
      termsConditions: ""
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(editingOffer ? "Updating offer:" : "Creating offer:", formData)
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Offers</h1>
          <p className="text-muted-foreground">
            Manage offers across promotions, vendors, and provinces
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateOffer} className="bg-gradient-primary shadow-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingOffer ? "Edit Offer" : "Create New Offer"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="promotion">Promotion</Label>
                  <Input
                    id="promotion"
                    value={formData.promotion}
                    onChange={(e) => setFormData({...formData, promotion: e.target.value})}
                    placeholder="Enter promotion name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="$0.00"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select value={formData.format} onValueChange={(value) => setFormData({...formData, format: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UPC">UPC</SelectItem>
                      <SelectItem value="Token">Token</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Select value={formData.province} onValueChange={(value) => setFormData({...formData, province: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.filter(p => p !== "All Provinces").map(province => (
                        <SelectItem key={province} value={province}>{province}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                  placeholder="Enter vendor name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter offer description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <Textarea
                  id="terms"
                  value={formData.termsConditions}
                  onChange={(e) => setFormData({...formData, termsConditions: e.target.value})}
                  placeholder="Enter terms and conditions"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => setFormData({...formData, status: checked})}
                />
                <Label htmlFor="status">Active</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">
                  {editingOffer ? "Update Offer" : "Create Offer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
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
                    <StatusBadge status={offer.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(offer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditOffer(offer)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
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