import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  subtitleExtra?: React.ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  className,
  actionHref,
  actionLabel,
  subtitleExtra,
}: Props) {
  return (
    <div
      className={cn(
        "flex-responsive",
        className,
      )}
    >
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="text-xs italic text-pink-500">{subtitleExtra}</p>
      </div>
      {actionHref && actionLabel && (
        <Link href={actionHref}>
          <Button
            variant="outline"
            className="btn-pink-outline"
          >
            <Plus />
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
