"use client";

import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
interface BreadcrumbNavItem {
  readonly name: string;
  readonly url: string;
}

interface BreadcrumbNavProps {
  items: readonly BreadcrumbNavItem[];
  /** Optional: aria-label for accessibility */
  ariaLabel?: string;
}

export function BreadcrumbNav({ items, ariaLabel = "Breadcrumb" }: BreadcrumbNavProps) {
  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center gap-1 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.url} className="flex items-center gap-1">
            {i > 0 && (
              <IconChevronRight
                className="size-4 shrink-0 text-white/40"
                aria-hidden
              />
            )}
            {isLast ? (
              <span className="text-white/80 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url.startsWith("http") ? item.url : item.url}
                className="text-white/60 hover:text-brand-cyan transition-colors"
              >
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
