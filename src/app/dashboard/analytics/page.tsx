import { analyticsData } from "@/lib/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function AnalyticsPage() {
  return (
    <div className="container mx-auto py-auto">
      <h1 className="text-3xl font-bold mb-4 ml-2">Analytics</h1>
      <DataTable columns={columns} data={analyticsData} />
    </div>
  );
}
