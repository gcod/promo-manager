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
    title: "CouponsOffer1-ProOne circlek ON",
    price: 24.99,
    promotion: { id: 1, name: "ProOne" },
    province: { id: 1, name: "Ontario", code: "ON" },
    vendor: { id: 1, name: "Circle K" },
    status: "active" as const,
    images: ["image1.jpg", "image2.jpg", "image3.jpg"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "CouponsOffer2-Pods petro BC",
    price: 11.00,
    promotion: { id: 2, name: "Pods" },
    province: { id: 2, name: "British Columbia", code: "BC" },
    vendor: { id: 2, name: "Petro-Canada" },
    status: "inactive" as const,
    images: ["image1.jpg", null, null],
    createdAt: "2024-01-12"
  },
  {
    id: 3,
    title: "CouponsOffer3-Ultra parkland AB",
    price: 29.99,
    promotion: { id: 3, name: "Ultra" },
    province: { id: 3, name: "Alberta", code: "AB" },
    vendor: { id: 3, name: "Parkland" },
    status: "active" as const,
    images: ["image1.jpg", "image2.jpg", "image3.jpg"],
    createdAt: "2024-01-10"
  }
]

const promotions = [
  { id: 1, name: "ProOne" },
  { id: 2, name: "Pods" },
  { id: 3, name: "Ultra" },
  { id: 4, name: "2x Ultra PODS" },
  { id: 99, name: "Evergreen" }
]

const vendors = [
  { id: 1, name: "Circle K" },
  { id: 2, name: "Petro-Canada" },
  { id: 3, name: "Shell" },
  { id: 4, name: "Parkland" },
  { id: 5, name: "711" }
]

const provinces = [
  { id: 1, name: "Ontario", code: "ON" },
  { id: 2, name: "British Columbia", code: "BC" },
  { id: 3, name: "Alberta", code: "AB" },
  { id: 4, name: "Quebec", code: "QC" }
]

const provinceFilterOptions = ["All Provinces", "ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "NL", "PE", "NT", "NU", "YT"]
const statuses = ["All Status", "Active", "Inactive"]

export default function Offers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvince, setSelectedProvince] = useState("All Provinces")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    promotionId: "",
    provinceId: "",
    vendorId: "",
    status: true,
    description: "",
    termsConditions: "",
    image1: "",
    image2: "",
    image3: ""
  })

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProvince = selectedProvince === "All Provinces" || offer.province.code === selectedProvince
    const matchesStatus = selectedStatus === "All Status" || 
                         (selectedStatus === "Active" && offer.status === "active") ||
                         (selectedStatus === "Inactive" && offer.status === "inactive")
    
    return matchesSearch && matchesProvince && matchesStatus
  })

  const handleCreateOffer = () => {
    setEditingOffer(null)
    setFormData({
      title: "",
      price: "",
      promotionId: "",
      provinceId: "",
      vendorId: "",
      status: true,
      description: "",
      termsConditions: "",
      image1: "",
      image2: "",
      image3: ""
    })
    setIsDialogOpen(true)
  }

  const handleEditOffer = (offer: any) => {
    setEditingOffer(offer)
    setFormData({
      title: offer.title,
      price: offer.price.toString(),
      promotionId: offer.promotion.id.toString(),
      provinceId: offer.province.id.toString(),
      vendorId: offer.vendor.id.toString(),
      status: offer.status === "active",
      description: "",
      termsConditions: "",
      image1: offer.images[0] || "",
      image2: offer.images[1] || "",
      image3: offer.images[2] || ""
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
              <div className="space-y-2">
                <Label htmlFor="title">Offer Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter offer title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promotion">Promotion</Label>
                  <Select value={formData.promotionId} onValueChange={(value) => setFormData({...formData, promotionId: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select promotion" />
                    </SelectTrigger>
                    <SelectContent>
                      {promotions.map(promotion => (
                        <SelectItem key={promotion.id} value={promotion.id.toString()}>{promotion.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Select value={formData.provinceId} onValueChange={(value) => setFormData({...formData, provinceId: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(province => (
                        <SelectItem key={province.id} value={province.id.toString()}>{province.name} ({province.code})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor">Vendor</Label>
                  <Select value={formData.vendorId} onValueChange={(value) => setFormData({...formData, vendorId: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map(vendor => (
                        <SelectItem key={vendor.id} value={vendor.id.toString()}>{vendor.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Images (3 required)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image1">Image 1</Label>
                    <Input
                      id="image1"
                      value={formData.image1}
                      onChange={(e) => setFormData({...formData, image1: e.target.value})}
                      placeholder="Image URL"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image2">Image 2</Label>
                    <Input
                      id="image2"
                      value={formData.image2}
                      onChange={(e) => setFormData({...formData, image2: e.target.value})}
                      placeholder="Image URL"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image3">Image 3</Label>
                    <Input
                      id="image3"
                      value={formData.image3}
                      onChange={(e) => setFormData({...formData, image3: e.target.value})}
                      placeholder="Image URL"
                      required
                    />
                  </div>
                </div>
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
                {provinceFilterOptions.map(province => (
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
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Promotion</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.title}</TableCell>
                  <TableCell className="font-mono text-success">${offer.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{offer.promotion.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{offer.province.code}</Badge>
                  </TableCell>
                  <TableCell>{offer.vendor.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {offer.images.map((image, index) => (
                        <div key={index} className="w-6 h-6 bg-muted rounded flex items-center justify-center text-xs">
                          {image ? '✓' : '✗'}
                        </div>
                      ))}
                    </div>
                  </TableCell>
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