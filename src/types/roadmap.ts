
export interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  type: "KAF" | "Feature";
  status: "planned" | "in-progress" | "completed" | "on-hold";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

export const statusColors = {
  planned: "bg-gray-500",
  "in-progress": "bg-amber-500",
  completed: "bg-green-500",
  "on-hold": "bg-red-500"
};
