import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { School } from "lucide-react";

export default function CampusSelect() {
  return (
    <Select>
      <SelectTrigger size="sm" className="w-auto lg:w-52 bg-gray-100 border border-gray-300 ring-0 focus:ring-0 focus-visible:ring-0"
      >
        <SelectValue placeholder="Select campus" />
      </SelectTrigger>

      <SelectContent className="bg-white">
        <SelectItem value="campus-1">
          <div className="flex-center-gap-2">
            <School className="h-4 w-4 text-gray-500" />
            <span>Campus 1</span>
          </div>
        </SelectItem>

        <SelectItem value="campus-2">
          <div className="flex-center-gap-2">
            <School className="h-4 w-4 text-gray-500" />
            <span>Campus 2</span>
          </div>
        </SelectItem>

        <SelectItem value="campus-3">
          <div className="flex-center-gap-2">
            <School className="h-4 w-4 text-gray-500" />
            <span>Campus 3</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
