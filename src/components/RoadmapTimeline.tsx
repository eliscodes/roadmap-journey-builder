
import { useState } from "react";
import RoadmapCard from "./RoadmapCard";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  type: "KAF" | "Feature";
  status: "planned" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

const RoadmapTimeline = () => {
  const [filter, setFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [items, setItems] = useState<RoadmapItem[]>([
    {
      id: 1,
      title: "User Authentication System",
      description: "Implement secure login and registration functionality",
      type: "Feature",
      status: "completed",
      priority: "high",
      dueDate: "2024-03-15",
    },
    {
      id: 2,
      title: "Dashboard Bug Fix",
      description: "Fix data visualization issues in the main dashboard",
      type: "KAF",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-03-20",
    },
    {
      id: 3,
      title: "API Integration",
      description: "Connect to third-party payment processing service",
      type: "Feature",
      status: "planned",
      priority: "high",
      dueDate: "2024-04-01",
    },
    {
      id: 4,
      title: "Performance Optimization",
      description: "Improve loading times for large data sets",
      type: "KAF",
      status: "planned",
      priority: "low",
      dueDate: "2024-04-15",
    },
  ]);

  const filteredItems = items.filter((item) =>
    filter === "all" ? true : item.type.toLowerCase() === filter.toLowerCase()
  );

  const handleEdit = (item: RoadmapItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    const formData = new FormData(e.currentTarget);
    const updatedItem: RoadmapItem = {
      ...editingItem,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as "KAF" | "Feature",
      status: formData.get("status") as "planned" | "in-progress" | "completed",
      priority: formData.get("priority") as "low" | "medium" | "high",
      dueDate: formData.get("dueDate") as string,
    };

    setItems(items.map((item) => 
      item.id === editingItem.id ? updatedItem : item
    ));
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Project Roadmap</h1>
        <div className="flex gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="kaf">KAF</SelectItem>
              <SelectItem value="feature">Features</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">+ Add Item</Button>
        </div>
      </div>
      
      <div className="relative space-y-4">
        <div className="timeline-connector" />
        {filteredItems.map((item) => (
          <div key={item.id} className="pl-8 fade-in">
            <RoadmapCard
              title={item.title}
              description={item.description}
              type={item.type}
              status={item.status}
              priority={item.priority}
              dueDate={item.dueDate}
              onEdit={() => handleEdit(item)}
            />
          </div>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Roadmap Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={editingItem?.title}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={editingItem?.description}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue={editingItem?.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KAF">KAF</SelectItem>
                  <SelectItem value="Feature">Feature</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={editingItem?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={editingItem?.priority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                defaultValue={editingItem?.dueDate}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoadmapTimeline;
