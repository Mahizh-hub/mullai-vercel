import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  actionLabel: string;
  actionHref: string;
};

export default function PageHeader({
  title,
  subtitle,
  actionHref,
  actionLabel,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-6 text-center md:text-start items-center mb-8 justify-between">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm mt-1 text-gray-500">{subtitle}</p>
      </div>
      <Link href={actionHref}>
        <Button
          variant="outline"
          className="text-pink-600 border-pink-600 hover:text-pink-700"
        >
          <Plus />
          {actionLabel}
        </Button>
      </Link>
    </div>
  );
}
