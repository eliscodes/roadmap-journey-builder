
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

const RoadmapTimeline = () => {
  const [filter, setFilter] = useState("all");

  const items = [
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
  ] as const;

  const filteredItems = items.filter((item) => 
    filter === "all" ? true : item.type.toLowerCase() === filter.toLowerCase()
  );

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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
