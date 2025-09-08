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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, MapPin, Edit } from "lucide-react"

// Mock data
const provinces = [
  {
    id: 1,
    code: "ON",
    name: "Ontario",
    status: "active" as const,
    legalAge: 19,
    totalOffers: 89,
    totalClaims: 1234,
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    code: "BC", 
    name: "British Columbia",
    status: "active" as const,
    legalAge: 19,
    totalOffers: 67,
    totalClaims: 987,
    createdAt: "2024-01-01"
  },
  {
    id: 3,
    code: "AB",
    name: "Alberta", 
    status: "active" as const,
    legalAge: 18,
    totalOffers: 45,
    totalClaims: 654,
    createdAt: "2024-01-01"
  },
  {
    id: 4,
    code: "MB",
    name: "Manitoba",
    status: "active" as const,
    legalAge: 18,
    totalOffers: 23,
    totalClaims: 321,
    createdAt: "2024-01-01"
  }
]

export default function Provinces() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredProvinces = provinces.filter(province => 
    province.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Provinces</h1>
          <p className="text-muted-foreground">
            Manage provincial regulations and configurations
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Province
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Province</DialogTitle>
              <DialogDescription>
                Configure a new province for offer management
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="provinceCode">Province Code</Label>
                <Input id="provinceCode" placeholder="ON" maxLength={2} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="provinceName">Province Name</Label>
                <Input id="provinceName" placeholder="Enter province name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="legalAge">Legal Age</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select legal age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="19">19</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="provinceActive" />
                <Label htmlFor="provinceActive">Active</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-primary">Create Province</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            All Provinces
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search provinces..."
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
                <TableHead>Province</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Legal Age</TableHead>
                <TableHead>Offers</TableHead>
                <TableHead>Total Claims</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProvinces.map((province) => (
                <TableRow key={province.id}>
                  <TableCell className="font-medium">{province.name}</TableCell>
                  <TableCell className="font-mono font-bold text-accent">
                    {province.code}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={province.status} />
                  </TableCell>
                  <TableCell className="font-medium">{province.legalAge}</TableCell>
                  <TableCell>{province.totalOffers}</TableCell>
                  <TableCell className="font-medium text-success">
                    {province.totalClaims.toLocaleString()}
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