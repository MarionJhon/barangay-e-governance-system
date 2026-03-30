"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Skeleton } from "../../ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonTableProps {
  columns: number; // ✅
  rows?: number; // ✅
  className?: string;
}

const SkeletonTable = ({
  columns,
  rows = 10,
  className,
}: SkeletonTableProps) => {
  return (
    <div className="space-y-4 bg-muted/50 rounded-xl">
      <div className={cn("rounded-sm shadow-sm overflow-hidden", className)}>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (
                <TableHead
                  key={i}
                  className="font-semibold text-foreground tracking-wide uppercase text-xs px-4 py-3"
                >
                  <Skeleton className="h-4 w-20 bg-gray-500/20"/> {/* ✅ skeleton header */}
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
                    <Skeleton
                      className={cn(
                        "h-4 w-full",
                        rowIndex % 2 === 0 ? "" : "bg-background/90",
                      )}
                    />{" "}
                    {/* ✅ skeleton cell */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SkeletonTable;
