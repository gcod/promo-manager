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
import { Plus, Search, Edit, Trash2, Star, ImageOff } from "lucide-react"

// Types
type Promotion = {
  id: number
  name: string
  type: string
  description: string
  color: string
  shortCopy: string
  priority: number
  status: "active" | "inactive"
  claims: number
  createdAt: string
}

// Mock data
const promotions = [
  {
    id: 1,
    name: "ProOne",
    type: "teaser",
    description: "GET $24.99 OFF* VUSE PRO ONE READY-TO-VAPE KIT + 1 PACK OF VUSE PODS",
    color: "#031D30",
    shortCopy: "one (1) Vuse Pro One and one (1) Vuse Pod",
    priority: 1,
    status: "active" as const,
    claims: 5684,
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Pods",
    type: "standard",
    description: "GET $11 OFF* two packs of vuse pods",
    color: "#7c3aed",
    shortCopy: "two (2) packs of Vuse Pods",
    priority: 2,
    status: "active" as const,
    claims: 3226,
    createdAt: "2024-01-10"
  },
  {
    id: 3,
    name: "Ultra",
    type: "standard",
    description: "GET $29.99 OFF* VUSE ULTRA + 1 PACK OF VUSE ULTRA PODS",
    color: "#dc2626",
    shortCopy: "one (1) Vuse Ultra device and one (1) pack of Vuse Ultra Pods",
    priority: 3,
    status: "active" as const,
    claims: 588,
    createdAt: "2024-01-08"
  },
  {
    id: 4,
    name: "2x Ultra PODS",
    type: "standard",
    description: "GET $9.99 OFF* 2 PACK OF VUSE ULTRA PODS",
    color: "#dc2626",
    shortCopy: "two (2) pack of Vuse Ultra Pods",
    priority: 4,
    status: "inactive" as const,
    claims: 588,
    createdAt: "2024-01-08"
  },
  {
    id: 99,
    name: "Evergreen",
    type: "standard",
    description: "-",
    color: "#dc2626",
    shortCopy: "-",
    priority: 99,
    status: "active" as const,
    claims: 25,
    createdAt: "2024-01-08"
  }
]

// Map promotion names to image paths in public/img
const promotionImageMap: Record<string, string> = {
  ProOne: "/img/CouponsOffer1-ProOne-product_image.png",
  Pods: "/img/CouponsOffer2-Pods-product_image.png",
  Ultra: "/img/CouponsOffer3-Ultra-product_image.png",
}

function PromoImage({ src, alt }: { src?: string; alt: string }) {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src)
  const [triedRootFallback, setTriedRootFallback] = useState(false)
  const [error, setError] = useState(false)

  if (!currentSrc || error) {
    return (
      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center border">
        <ImageOff className="h-5 w-5 text-muted-foreground" />
      </div>
    )
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className="h-12 w-12 rounded-md object-cover border"
      onError={() => {
        if (!triedRootFallback && currentSrc.startsWith('/img/')) {
          setCurrentSrc(currentSrc.replace('/img/', '/'))
          setTriedRootFallback(true)
        } else {
          setError(true)
        }
      }}
      loading="lazy"
    />
  )
}

export default function Promotions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "standard",
    description: "",
    shortCopy: "",
    color: "#2563eb",
    priority: "1",
    status: true
  })

  const filteredPromotions = promotions.filter(promo => 
    promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreatePromotion = () => {
    setEditingPromotion(null)
    setFormData({
      name: "",
      type: "standard",
      description: "",
      shortCopy: "",
      color: "#2563eb",
      priority: "1",
      status: true
    })
    setIsCreateOpen(true)
  }

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion)
    setFormData({
      name: promotion.name,
      type: promotion.type,
      description: promotion.description,
      shortCopy: promotion.shortCopy,
      color: promotion.color,
      priority: promotion.priority.toString(),
      status: promotion.status === "active"
    })
    setIsEditOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(editingPromotion ? "Updating promotion:" : "Creating promotion:", formData)
    setIsCreateOpen(false)
    setIsEditOpen(false)
  }

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
            <Button onClick={handleCreatePromotion} className="bg-gradient-primary shadow-primary">
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Promotion Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter promotion name" 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
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
                  <Textarea 
                    id="description" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your promotion" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="shortCopy">Short Copy</Label>
                  <Input 
                    id="shortCopy" 
                    value={formData.shortCopy}
                    onChange={(e) => setFormData({...formData, shortCopy: e.target.value})}
                    placeholder="Brief promotional text" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="color">Color (Hex)</Label>
                    <Input 
                      id="color" 
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      placeholder="#2563eb" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">(1)</SelectItem>
                        <SelectItem value="2">(2)</SelectItem>
                        <SelectItem value="3">(3)</SelectItem>
                        <SelectItem value="4">(4)</SelectItem>
                        <SelectItem value="99">(99)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="active" 
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked})}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">Create Promotion</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Promotion</DialogTitle>
              <DialogDescription>
                Update the promotion details
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Promotion Name</Label>
                  <Input 
                    id="edit-name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter promotion name" 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
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
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea 
                    id="edit-description" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe your promotion" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-shortCopy">Short Copy</Label>
                  <Input 
                    id="edit-shortCopy" 
                    value={formData.shortCopy}
                    onChange={(e) => setFormData({...formData, shortCopy: e.target.value})}
                    placeholder="Brief promotional text" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-color">Color (Hex)</Label>
                    <Input 
                      id="edit-color" 
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      placeholder="#2563eb" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
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
                  <Switch 
                    id="edit-active" 
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({...formData, status: checked})}
                  />
                  <Label htmlFor="edit-active">Active</Label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary">Update Promotion</Button>
              </div>
            </form>
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
                      <PromoImage src={promotionImageMap[promotion.name]} alt={promotion.name} />
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
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleEditPromotion(promotion)}
                      >
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