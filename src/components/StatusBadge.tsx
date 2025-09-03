import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'expired' | 'pending'
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      label: 'Active',
      className: 'bg-success-light text-success border-success/20'
    },
    inactive: {
      label: 'Inactive', 
      className: 'bg-muted text-muted-foreground border-border'
    },
    expired: {
      label: 'Expired',
      className: 'bg-destructive-light text-destructive border-destructive/20'
    },
    pending: {
      label: 'Pending',
      className: 'bg-warning-light text-warning border-warning/20'
    }
  }

  const config = statusConfig[status]

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {config.label}
    </span>
  )
}