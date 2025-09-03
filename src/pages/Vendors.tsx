import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Users, Edit } from "lucide-react"

// Mock data
const vendors = [
  {
    id: 1,
    code: "VCORP001",
    name: "VendorCorp",
    status: "active" as const,
    totalOffers: 23,
    provinces: ["ON", "BC"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    code: "RPLUS002",
    name: "RetailPlus",
    status: "active" as const,
    totalOffers: 18,
    provinces: ["BC", "AB"],
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    code: "SHOP003",
    name: "ShopMart",
    status: "inactive" as const,
    totalOffers: 12,
    provinces: ["AB", "SK"],
    createdAt: "2024-01-08"
  },
  {
    id: 4,
    code: "PROMO004",
    name: "PromoLand",
    status: "active" as const,
    totalOffers: 31,
    provinces: ["QC", "ON"],
    createdAt: "2024-01-05"
  }
]

export default function Vendors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendors</h1>
          <p className="text-muted-foreground">
            Manage vendor partnerships and assignments
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
              <DialogDescription>
                Create a new vendor profile for offer management
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="vendorCode">Vendor Code</Label>
                <Input id="vendorCode" placeholder="VENDOR001" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input id="vendorName" placeholder="Enter vendor name" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="vendorActive" />
                <Label htmlFor="vendorActive">Active</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-primary">Create Vendor</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            All Vendors
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Provinces</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell className="font-mono text-muted-foreground">
                    {vendor.code}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={vendor.status} />
                  </TableCell>
                  <TableCell className="font-medium">{vendor.totalOffers}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {vendor.provinces.map(province => (
                        <span 
                          key={province}
                          className="px-1.5 py-0.5 bg-accent/20 text-accent text-xs rounded"
                        >
                          {province}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(vendor.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost">
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