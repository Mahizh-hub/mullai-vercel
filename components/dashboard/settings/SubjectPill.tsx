import { cn } from "@/lib/utils";

type PillColor = "blue" | "purple" | "pink" | "green" | "green-light";

type Props = {
  label: string;
  color: PillColor;
};

// Solid vibrant colors matching the design
const colorClasses: Record<PillColor, string> = {
  blue: "bg-blue-500 text-white",
  purple: "bg-purple-600 text-white",
  pink: "bg-pink-500 text-white",
  green: "bg-emerald-600 text-white",
  "green-light": "bg-emerald-400 text-white",
};

export default function SubjectPill({ label, color }: Props) {
  return (
    <span
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
        colorClasses[color]
      )}
    >
      {label}
    </span>
  );
}

// Grouped subjects container (like Computer Science + CS Lab)
type GroupedSubjectsProps = {
  subjects: { label: string; color: PillColor }[];
};

export function GroupedSubjects({ subjects }: GroupedSubjectsProps) {
  return (
    <div className="inline-flex items-center outline-1 bg-emerald-50 outline-emerald-400 rounded-full p-1 gap-1">
      {subjects.map((subject, index) => (
        <span
          key={index}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap",
            colorClasses[subject.color]
          )}
        >
          {subject.label}
        </span>
      ))}
    </div>
  );
}
