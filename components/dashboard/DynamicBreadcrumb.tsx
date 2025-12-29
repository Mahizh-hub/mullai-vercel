"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Home } from "lucide-react";

const IGNORED_SEGMENT = ["dashboard"];
const ACTION_SEGMENTS = ["create", "edit"];

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => !IGNORED_SEGMENT.includes(segment) && !isId(segment));

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    ...segments.map((segment, index) => ({
      label: formatSegment(segment),
      href:
        index === segments.length - 1
          ? null
          : "/dashboard/" + segments.slice(0, index + 1).join("/"),
    })),
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <BreadcrumbItemWithSeparator
              key={item.label}
              showSeparator={index !== 0}
            >
              {isLast || !item.href ? (
                <BreadcrumbPage className="text-xs">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink className="text-xs" asChild>
                  <Link
                    href={item.href}
                    className="flex text-xs items-center gap-2"
                  >
                    {item.label === "Dashboard" && (
                      <Home className="size-3 text-muted-foreground" />
                    )}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItemWithSeparator>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbItemWithSeparator({
  children,
  showSeparator,
}: {
  children: React.ReactNode;
  showSeparator: boolean;
}) {
  return (
    <>
      {showSeparator && <BreadcrumbSeparator className="size-3" />}
      <BreadcrumbItem>{children}</BreadcrumbItem>
    </>
  );
}

function isId(segment: string) {
  return /^[0-9]+$/.test(segment);
}

function formatSegment(segment: string) {
  if (ACTION_SEGMENTS.includes(segment)) {
    return capitalize(segment);
  }

  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
