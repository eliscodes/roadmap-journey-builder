
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface HeaderProps {
  filter: string;
  onFilterChange: (value: string) => void;
  onAddClick: () => void;
}

const Header = ({ filter, onFilterChange, onAddClick }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Project Roadmap</h1>
      <div className="flex gap-4">
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="kaf">KAF</SelectItem>
            <SelectItem value="feature">Features</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={onAddClick}>+ Add Item</Button>
      </div>
    </div>
  );
};

export default Header;
