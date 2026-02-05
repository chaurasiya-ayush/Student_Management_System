"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number; // current page (0-based)
  totalPages: number; // total pages from backend
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Helper to jump to first/last
  const isFirstPage = page === 0;
  const isLastPage = page === totalPages - 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
      {/* Page Info */}
      <p className="text-sm text-muted-foreground font-medium">
        Showing page <span className="text-foreground">{page + 1}</span> of{" "}
        <span className="text-foreground">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1">
        {/* First Page */}
        <Button
          variant="outline"
          size="icon"
          className="hidden lg:flex h-8 w-8"
          onClick={() => onPageChange(0)}
          disabled={isFirstPage}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 pr-2.5"
          onClick={() => onPageChange(page - 1)}
          disabled={isFirstPage}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Prev</span>
        </Button>

        {/* Page Numbers - Limited View */}
        <div className="flex items-center gap-1 mx-2">
          {/* We show the current page and its neighbors if they exist */}
          {[...Array(totalPages)].map((_, index) => {
            // Logic to only show current, one before, and one after for a cleaner UI
            if (
              index === page || 
              index === page - 1 || 
              index === page + 1 ||
              (page === 0 && index === 2) ||
              (page === totalPages - 1 && index === totalPages - 3)
            ) {
              return (
                <Button
                  key={index}
                  variant={page === index ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-xs"
                  onClick={() => onPageChange(index)}
                >
                  {index + 1}
                </Button>
              );
            }
            return null;
          })}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 pl-2.5"
          onClick={() => onPageChange(page + 1)}
          disabled={isLastPage}
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="icon"
          className="hidden lg:flex h-8 w-8"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={isLastPage}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}