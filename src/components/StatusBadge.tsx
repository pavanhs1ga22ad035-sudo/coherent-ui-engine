import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "not-started" | "in-progress" | "shipped";
  className?: string;
}

const statusConfig = {
  "not-started": {
    label: "Not Started",
    classes: "bg-secondary text-muted-foreground",
  },
  "in-progress": {
    label: "In Progress",
    classes: "bg-warning/15 text-warning",
  },
  shipped: {
    label: "Shipped",
    classes: "bg-success/15 text-success",
  },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-3 py-1 text-xs font-medium font-body tracking-wide",
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
