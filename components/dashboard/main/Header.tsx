import { School, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col md:flex-row text-center md:text-start gap-6 items-center justify-between">
        <div>
          <h4 className="mb-1 text-xl font-semibold">
            School Overview Dashboard
          </h4>
          <p className="text-sm font-medium text-gray-500/80 leading-relaxed tracking-wide">
            Monitor daily attendance, staff availability, admissions, and key
            school activities in one place.
          </p>
        </div>

        {/* Campus Select */}
        <div className="relative w-60">
          {/* Left icon */}
          <School className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />

          {/* Native select */}
          <select
            defaultValue="campus-1"
            className="
              h-11 w-full appearance-none rounded-md
               bg-white
               border border-gray-200
              pl-10 pr-9 text-sm
              focus:border-pink-500 focus:outline-none
            "
          >
            <option value="campus-1">Campus 1</option>
            <option value="campus-2">Campus 2</option>
            <option value="campus-3">Campus 3</option>
          </select>

          {/* Right chevron */}
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  );
}
