import { MetricCard } from "@/components/MetricCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TrendingUp, Users, MapPin, Award, Calendar } from "lucide-react"

// Mock analytics data
const analyticsMetrics = [
  {
    title: "Total Claims",
    value: "9,523",
    description: "Last 30 days",
    icon: TrendingUp,
    trend: { value: 12, isPositive: true }
  },
  {
    title: "Active Users",
    value: "3,234",
    description: "Monthly active",
    icon: Users,
    trend: { value: 8, isPositive: true }
  },
  {
    title: "Top Province",
    value: "Ontario",
    description: "45% of claims",
    icon: MapPin
  },
  {
    title: "Top vendor claims",
    value: "Circle K",
    description: "22% of claims",
    icon: Award
  }
]

const topPromotions = [
  { name: "ProOne", claims: 5684, conversion: "50.2%" },
  { name: "Pods", claims: 3326, conversion: "30.8%" },
  { name: "Ultra", claims: 588, conversion: "5.8%" },
  { name: "2x Ultra PODS", claims: 221, conversion: "3.8%" },
  { name: "Evergreen", claims: 25, conversion: "2.1%" }
]

const provinceData = [
  { province: "Ontario", code: "ON", claims: "4,285", percentage: 45 },
  { province: "British Columbia", code: "BC", claims: "3,047", percentage: 32 },
  { province: "Alberta", code: "AB", claims: "1,428", percentage: 15 },
  { province: "Manitoba", code: "MB", claims: "762", percentage: 8 }
]

const ageGroups = [
  { group: "18-25", percentage: 28, users: 905 },
  { group: "26-35", percentage: 35, users: 1234 },
  { group: "36-45", percentage: 22, users: 892 },
  { group: "46+", percentage: 15, users: 568 }
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top Performing Promotions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPromotions.map((promo, index) => (
                <div key={promo.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{promo.name}</p>
                      <p className="text-sm text-muted-foreground">{promo.claims} claims</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{promo.conversion}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Province Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {provinceData.map((data) => (
                <div key={data.code} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{data.province}</span>
                      <Badge variant="outline">{data.code}</Badge>
                    </div>
                    <span className="text-sm font-medium">{data.claims}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{data.percentage}% of total claims</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-success" />
            User Demographics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {ageGroups.map((group) => (
              <div key={group.group} className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{group.percentage}%</div>
                <div className="text-sm text-muted-foreground mb-2">{group.group} years old</div>
                <div className="text-xs text-muted-foreground">{group.users} users</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}