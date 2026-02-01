"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, ...props }, ref) => {
    const canPrev = currentPage > 1;
    const canNext = currentPage < totalPages;

    const getVisiblePages = () => {
      const delta = 1;
      const range: number[] = [];
      const rangeWithDots: (number | "ellipsis")[] = [];
      let l: number | undefined;
      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - delta && i <= currentPage + delta)
        ) {
          range.push(i);
        }
      }
      for (const i of range) {
        if (l !== undefined) {
          if (i - l === 2) rangeWithDots.push(l + 1);
          else if (i - l !== 1) rangeWithDots.push("ellipsis");
        }
        rangeWithDots.push(i);
        l = i;
      }
      return rangeWithDots;
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-2", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPrev}
          className={cn(
            "inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-[#D4AF37] disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, i) =>
            page === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-2 text-white/60">
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  currentPage === page
                    ? "bg-[#D4AF37] text-[#0C173D]"
                    : "text-white hover:bg-white/10 hover:text-[#D4AF37]"
                )}
              >
                {page}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNext}
          className={cn(
            "inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-[#D4AF37] disabled:pointer-events-none disabled:opacity-50"
          )}
        >
          Next
        </button>
      </div>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };
