"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

interface SkeletonTableProps {
  columns: number; // ✅
  rows?: number; // ✅
}

const SkeletonTable = ({ columns, rows = 10 }: SkeletonTableProps) => {
  return (
    <div className="space-y-4 bg-muted/50 rounded-xl">
      <div className="rounded-sm border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead
                  key={i}
                  className="font-semibold text-foreground tracking-wide uppercase text-xs px-4 py-3"
                >
                  <Skeleton className="h-4 w-20" /> {/* ✅ skeleton header */}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"}
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell key={colIndex} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" /> {/* ✅ skeleton cell */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-40" /> {/* rows info */}
          <Skeleton className="h-8 w-24" /> {/* page size select */}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20" /> {/* page badge */}
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
