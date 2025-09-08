import { MetricCard } from "@/components/MetricCard"
import { StatusBadge } from "@/components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Package, Users, MapPin, TrendingUp, Award } from "lucide-react"

// Mock data for demonstration
const metrics = [
  {
    title: "Active Promotions",
    value: 4,
    description: "1 inactive",
    icon: Star,
    trend: { value: 8, isPositive: true }
  },
  {
    title: "Total Offers",
    value: 124,
    description: "Across all provinces",
    icon: Package,
    trend: { value: 15, isPositive: true }
  },
  {
    title: "Active Vendors",
    value: 5,
    description: "3 new this month",
    icon: Users,
    trend: { value: 5, isPositive: true }
  },
  {
    title: "Total Claims",
    value: "9,523",
    description: "This month",
    icon: TrendingUp,
    trend: { value: 23, isPositive: true }
  }
]

const recentPromotions = [
  {
    id: 1,
    name: "ProOne",
    type: "teaser",
    status: "active" as const,
    claims: 5684,
    color: "#2563eb"
  },
  {
    id: 2,
    name: "Pods",
    type: "standard",
    status: "active" as const,
    claims: 3226,
    color: "#7c3aed"
  },
  {
    id: 3,
    name: "Ultra",
    type: "standard", 
    status: "active" as const,
    claims: 588,
    color: "#dc2626"
  },
  {
    id: 4,
    name: "Evergreen",
    type: "standard",
    status: "active" as const,
    claims: 25,
    color: "#7c3aed"
  }
]

const topVendors = [
  { name: "Circle K", claims: 234, province: "ON" },
  { name: "Petro-Canada", claims: 189, province: "BC" },
  { name: "Shell", claims: 167, province: "AB" },
  { name: "Parkland", claims: 134, province: "MB" }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your promotions and marketing campaigns
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Recent Promotions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPromotions.map((promo) => (
                <div key={promo.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: promo.color }}
                    />
                    <div>
                      <p className="font-medium">{promo.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={promo.type === 'teaser' ? 'secondary' : 'outline'}>
                          {promo.type}
                        </Badge>
                        <StatusBadge status={promo.status} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{promo.claims} claims</p>
                    <p className="text-xs text-muted-foreground">this month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Top Vendors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topVendors.map((vendor, index) => (
                <div key={vendor.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{vendor.name}</p>
                      <p className="text-xs text-muted-foreground">{vendor.province}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{vendor.claims}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button className="bg-gradient-primary shadow-primary">
          <Star className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
        <Button variant="outline">
          <Package className="h-4 w-4 mr-2" />
          Manage Offers
        </Button>
      </div>
    </div>
  )
}