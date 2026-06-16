import { analyticsData } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function AnalyticsPage() {
  return (
    <div className="container mx-auto py-auto">
      <DataTable columns={columns} data={analyticsData} />
    </div>
  );
}
