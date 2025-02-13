
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { format } from "date-fns";

interface RoadmapCardProps {
  title: string;
  description: string;
  type: "KAF" | "Feature";
  status: "planned" | "in-progress" | "completed" | "on-hold";
  priority: "low" | "medium" | "high";
  team: "Backend Team" | "Frontend Team";
  dueDate: string;
  className?: string;
  onEdit?: () => void;
}

const RoadmapCard = ({
  title,
  description,
  type,
  status,
  priority,
  dueDate,
  className,
  onEdit,
}: RoadmapCardProps) => {
  const statusColors = {
    planned: "bg-gray-100 text-gray-800",
    "in-progress": "bg-amber-100 text-amber-800",
    completed: "bg-green-100 text-green-800",
    "on-hold": "bg-red-100 text-red-800",
  };

  const formattedDate = format(new Date(dueDate), 'MMM dd, yyyy');

  return (
    <Card className={cn("hover:shadow-lg transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className={cn(
              "font-medium",
              type === "Feature" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
            )}
          >
            {type}
          </Badge>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Badge
            variant="outline"
            className={cn("status-chip", statusColors[status])}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default RoadmapCard;
