import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="w-full my-4 px-4">
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-md border bg-card text-card-foreground">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="bg-blue-50 h-4 w-28 ml-2" />
                </TableHead>
                <TableHead>
                  <Skeleton className="bg-blue-50 h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="bg-blue-50 h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="bg-blue-50 h-4 w-16" />
                </TableHead>
                <TableHead>
                  <Skeleton className="bg-blue-50 h-4 w-24" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 8 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex flex-col gap-1 ml-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-14" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
