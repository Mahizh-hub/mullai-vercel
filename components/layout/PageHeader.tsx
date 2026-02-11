import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string; // Wrapper class
  subtitleExtra?: React.ReactNode;
  icon?: "default" | "back";
};

export default function PageHeader({
  title,
  subtitle,
  className,
  actionHref,
  actionLabel,
  onActionClick,
  subtitleExtra,
  icon = "default"
}: Props) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6", className)}>
      <div>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        <p className="text-xs italic text-pink-500">{subtitleExtra}</p>
      </div>
      {(actionLabel && (actionHref || onActionClick)) && (
        onActionClick ? (
          <Button onClick={onActionClick} className="bg-pink-500 hover:bg-pink-600 text-white">
             {icon === "default" && <Plus className="h-4 w-4" />}
             {icon === "back" && <ArrowLeft className="h-4 w-4" />}
             {actionLabel}
          </Button>
        ) : (
          <Link href={actionHref!}>
            <Button>
              {icon === "default" && <Plus className="h-4 w-4" />}
              {icon === "back" && <ArrowLeft className="h-4 w-4" />}
              {actionLabel}
            </Button>
          </Link>
        )
      )}
    </div>
  );
}
