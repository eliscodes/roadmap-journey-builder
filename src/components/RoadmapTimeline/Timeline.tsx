
import { format } from "date-fns";
import { RoadmapItem, statusColors } from "@/types/roadmap";

interface TimelineProps {
  items: RoadmapItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative mb-16 h-2 bg-gray-100 rounded">
      <div className="absolute inset-0 flex items-center justify-between px-4">
        {items.map((item, index) => (
          <div 
            key={item.id}
            className="relative"
            style={{ left: `${(index / (items.length - 1)) * 100}%` }}
          >
            <div className={`w-4 h-4 rounded-full ${statusColors[item.status]}`} />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
              {format(new Date(item.dueDate), 'MMM dd, yyyy')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
