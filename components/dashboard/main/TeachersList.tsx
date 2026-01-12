import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Teacher {
  name: string;
  email: string;
  subject: string;
  image: string;
}

const teachers: Teacher[] = [
  {
    name: "Sarah W.",
    email: "sarah@trezo.com",
    subject: "Mathematics",
    image: "/users/user53.jpg",
  },
  {
    name: "Michael T.",
    email: "michael@trezo.com",
    subject: "English",
    image: "/users/user54.jpg",
  },
  {
    name: "Emily J.",
    email: "emily@trezo.com",
    subject: "History",
    image: "/users/user55.jpg",
  },
  {
    name: "David A.",
    email: "david@trezo.com",
    subject: "Art",
    image: "/users/user56.jpg",
  },
  {
    name: "Jessica M.",
    email: "jessica@trezo.com",
    subject: "Music",
    image: "/users/user57.jpg",
  },
];

export default function TeachersList() {
  return (
    <div className="card-widget p-0">
      {/*Header*/}
      <div className="flex-center-between p-6">
        <h5 className="font-semibold text-lg">Teachers</h5>
        <Link
          href="/"
          className="flex-center text-sm text-gray-500 hover:text-gray-600"
        >
          View All <ChevronRight />
        </Link>
      </div>

      {/*Table*/}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y text-left text-gray-500">
              <th className="px-8 py-2 font-medium">Name</th>
              <th className="px-8 py-2 text-end font-medium">Subject</th>
            </tr>
          </thead>

          <tbody>
            {teachers.slice(0, 5).map((teacher) => (
              <tr key={teacher.email} className="border-b last:border-none">
                <td className="px-8 py-3">
                  <div className="flex-center-gap-3">
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-700">
                        {teacher.name}
                      </p>
                      <p className="text-xs text-gray-500">{teacher.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-3 text-end text-gray-700">
                  {teacher.subject}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
