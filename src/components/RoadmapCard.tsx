
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface RoadmapCardProps {
  title: string;
  description: string;
  type: "KAF" | "Feature";
  status: "planned" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  className?: string;
}

const RoadmapCard = ({
  title,
  description,
  type,
  status,
  priority,
  dueDate,
  className,
}: RoadmapCardProps) => {
  const statusColors = {
    planned: "bg-gray-100 text-gray-800",
    "in-progress": "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    low: "bg-blue-400",
    medium: "bg-amber-400",
    high: "bg-rose-400",
  };

  return (
    <Card className={cn("roadmap-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <span className={cn("priority-indicator", priorityColors[priority])} />
          <Badge variant="secondary" className="font-medium">
            {type}
          </Badge>
        </div>
        <Badge variant="outline" className={cn("status-chip", statusColors[status])}>
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="text-xs text-muted-foreground">Due: {dueDate}</div>
      </CardContent>
    </Card>
  );
};

export default RoadmapCard;
