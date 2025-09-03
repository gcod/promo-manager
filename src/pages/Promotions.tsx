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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Edit, Trash2, Star } from "lucide-react"

// Mock data
const promotions = [
  {
    id: 1,
    name: "Black Friday Special",
    type: "standard",
    description: "Exclusive Black Friday deals for all customers",
    color: "#2563eb",
    shortCopy: "Save big on Black Friday!",
    priority: 1,
    status: "active" as const,
    claims: 89,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "New Year Teaser",
    type: "teaser",
    description: "Get ready for amazing New Year promotions",
    color: "#7c3aed",
    shortCopy: "Something big is coming...",
    priority: 2,
    status: "pending" as const,
    claims: 12,
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    name: "Holiday Bundle",
    type: "standard",
    description: "Special holiday package deals",
    color: "#dc2626",
    shortCopy: "Holiday magic awaits!",
    priority: 1,
    status: "inactive" as const,
    claims: 156,
    createdAt: "2024-01-08"
  }
]

export default function Promotions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredPromotions = promotions.filter(promo => 
    promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Promotions</h1>
          <p className="text-muted-foreground">
            Manage and track your marketing promotions
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary shadow-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
              <DialogDescription>
                Add a new promotion to your marketing campaigns
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Promotion Name</Label>
                <Input id="name" placeholder="Enter promotion name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="teaser">Teaser</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe your promotion" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shortCopy">Short Copy</Label>
                <Input id="shortCopy" placeholder="Brief promotional text" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="color">Color (Hex)</Label>
                  <Input id="color" placeholder="#2563eb" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">High (1)</SelectItem>
                      <SelectItem value="2">Medium (2)</SelectItem>
                      <SelectItem value="3">Low (3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="active" />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-primary">Create Promotion</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            All Promotions
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search promotions..."
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
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Claims</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: promotion.color }}
                      />
                      <div>
                        <p className="font-medium">{promotion.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {promotion.shortCopy}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={promotion.type === 'teaser' ? 'secondary' : 'outline'}>
                      {promotion.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={promotion.status} />
                  </TableCell>
                  <TableCell className="font-medium">{promotion.claims}</TableCell>
                  <TableCell>{promotion.priority}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(promotion.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {promotion.status === 'inactive' && (
                        <Button size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
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