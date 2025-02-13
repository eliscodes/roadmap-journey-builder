
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import RoadmapCard from "../RoadmapCard";
import Header from "./Header";
import Timeline from "./Timeline";
import EditDialog from "./EditDialog";
import AddDialog from "./AddDialog";
import { RoadmapItem } from "@/types/roadmap";

const RoadmapTimeline = () => {
  const [filter, setFilter] = useState("all");
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

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
      status: formData.get("status") as "planned" | "in-progress" | "completed" | "on-hold",
      priority: formData.get("priority") as "low" | "medium" | "high",
      dueDate: formData.get("dueDate") as string,
    };

    setItems(items.map((item) => 
      item.id === editingItem.id ? updatedItem : item
    ));
    setIsEditDialogOpen(false);
    setEditingItem(null);
    toast({
      title: "Item updated",
      description: "The roadmap item has been successfully updated.",
    });
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newItem: RoadmapItem = {
      id: Math.max(...items.map(item => item.id), 0) + 1,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as "KAF" | "Feature",
      status: formData.get("status") as "planned" | "in-progress" | "completed" | "on-hold",
      priority: formData.get("priority") as "low" | "medium" | "high",
      dueDate: formData.get("dueDate") as string,
    };

    setItems([...items, newItem]);
    setIsAddDialogOpen(false);
    toast({
      title: "Item added",
      description: "New roadmap item has been successfully added.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header 
        filter={filter}
        onFilterChange={setFilter}
        onAddClick={() => setIsAddDialogOpen(true)}
      />
      
      <Timeline items={filteredItems} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <RoadmapCard
            key={item.id}
            title={item.title}
            description={item.description}
            type={item.type}
            status={item.status}
            priority={item.priority}
            dueDate={item.dueDate}
            onEdit={() => handleEdit(item)}
          />
        ))}
      </div>

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        item={editingItem}
        onSubmit={handleSaveEdit}
      />

      <AddDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default RoadmapTimeline;
