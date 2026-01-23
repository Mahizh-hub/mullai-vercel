"use client";

import { cn } from "@/lib/utils";

type Props = {
  group: {
    id: string;
    name: string;
    subjects: string[];
  };
  sections: string[];
  sectionAssignments: Record<string, string>;
  onSectionToggle: (section: string, groupId: string) => void;
};

export default function GroupCard({
  group,
  sections,
  sectionAssignments,
  onSectionToggle,
}: Props) {
  return (
    <div className="card-nested">
      <h5 className="text-base font-semibold mb-3">{group.name}</h5>

      {/* Subjects Table */}
      <div className="overflow-x-auto mb-4">
        <table className="min-w-[600px] w-full text-sm rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Group</th>
              {group.subjects.map((_, index) => (
                <th key={index} className="text-left p-2">
                  Subject {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 text-gray-600">{group.name}</td>
              {group.subjects.map((subject, index) => (
                <td key={index} className="p-2 text-gray-600">
                  {subject}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section Pills */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => {
          const isAssigned = sectionAssignments[section] === group.id;
          const isDisabled = Boolean(
            sectionAssignments[section] && sectionAssignments[section] !== group.id
          );

          return (
            <button
              key={section}
              type="button"
              onClick={() => !isDisabled && onSectionToggle(section, group.id)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isAssigned
                  ? "bg-pink-500 text-white"
                  : isDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
              )}
              disabled={isDisabled}
            >
              {section}
            </button>
          );
        })}
      </div>
    </div>
  );
}
