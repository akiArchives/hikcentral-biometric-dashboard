import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarCheck2,
  UserRoundX,
  ClockAlert,
  Users,
  ArrowRight,
  Fingerprint,
} from "lucide-react";
import { processDailyLogs } from "@/utils/attendance-processor";
import Link from "next/link";

function formatTime12h(timeStr: string): string {
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  const h = parseInt(parts[0], 10);
  const m = parts[1];
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 || 12;
  return `${displayH}:${m} ${ampm}`;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  let rawLogs: any[] = [];
  let allEmployees: any[] = [];
  let recentLogs: any[] = [];
  let errorMsg = "";

  try {
    const [logsRes, empRes, recentRes] = await Promise.all([
      supabase
        .from("hik_biometric_logs")
        .select("*")
        .eq("log_date", today)
        .order("log_date_time", { ascending: true }),
      supabase
        .from("employees")
        .select("employee_id, employee_name")
        .eq("is_active", true)
        .order("employee_name", { ascending: true }),
      supabase
        .from("hik_biometric_logs")
        .select("*")
        .order("log_date_time", { ascending: false })
        .limit(5),
    ]);

    if (logsRes.error) {
      console.error("Logs fetch error:", logsRes.error);
      errorMsg = "Error loading logs from database.";
    } else {
      rawLogs = logsRes.data || [];
    }

    if (empRes.error) {
      console.error("Employees fetch error:", empRes.error);
      errorMsg = "Error loading employee data.";
    } else {
      allEmployees = empRes.data || [];
    }

    if (recentRes.error) {
      console.error("Recent logs fetch error:", recentRes.error);
    } else {
      recentLogs = recentRes.data || [];
    }
  } catch (err) {
    console.error("Unexpected fetch exception:", err);
    errorMsg = "An unexpected error occurred while fetching data.";
  }

  // Process today's attendance logs
  const processedData = processDailyLogs(rawLogs, allEmployees, true);

  const presentCount = processedData.filter((emp) => emp.status === "present").length;
  const lateCount = processedData.filter((emp) => emp.status === "late").length;
  const absentCount = processedData.filter((emp) => emp.status === "absent").length;
  const totalCount = allEmployees.length;

  return (
    <div className="w-full h-full pb-10 mt-5 px-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="ml-3 flex flex-row items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">
            Dashboard
          </h1>
          <Separator orientation="vertical" />
          <p className="text-sm text-gray-400">Overview</p>
        </div>
        <p className="text-xs text-gray-400 mr-3">
          Today: {today}
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {errorMsg}
        </div>
      )}

      {/*Cards*/}
      <div className="grid grid-cols-4 gap-6 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center text-gray-700 gap-2">
              <span className="size-2 rounded-full bg-emerald-500"></span>
              Present
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {presentCount}
            </CardTitle>
            <CardAction>
              <div className="flex h-13 w-13 items-center justify-center rounded-md bg-emerald-100/80 text-emerald-600">
                <CalendarCheck2 className="size-9" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="py-1.5 justify-center">
            <Link href="/dashboard/analytics?status=present">
              <Button
                variant="link"
                className="h-auto p-0 text-xs gap-1 text-muted-foreground hover:text-primary hover:no-underline group"
              >
                View details
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center text-gray-700 gap-2">
              <span className="size-2 rounded-full bg-yellow-500"></span>
              Late
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {lateCount}
            </CardTitle>
            <CardAction>
              <div className="flex h-13 w-13 items-center justify-center rounded-md bg-yellow-100/80 text-yellow-600">
                <ClockAlert className="size-9" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="py-1.5 justify-center">
            <Link href="/dashboard/analytics?status=late">
              <Button
                variant="link"
                className="h-auto p-0 text-xs gap-1 text-muted-foreground hover:text-primary hover:no-underline group"
              >
                View details
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center text-gray-700 gap-2">
              <span className="size-2 rounded-full bg-red-500"></span>
              Absent
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {absentCount}
            </CardTitle>
            <CardAction>
              <div className="flex h-13 w-13 items-center justify-center rounded-md bg-red-100/80 text-red-600">
                <UserRoundX className="size-9" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="py-1.5 justify-center">
            <Link href="/dashboard/analytics?status=absent">
              <Button
                variant="link"
                className="h-auto p-0 text-xs gap-1 text-muted-foreground hover:text-primary hover:no-underline group"
              >
                View details
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center text-gray-700 gap-2">
              <span className="size-2 rounded-full bg-indigo-500"></span>
              Total Employees
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalCount}
            </CardTitle>
            <CardAction>
              <div className="flex h-13 w-13 items-center justify-center rounded-md bg-indigo-100/80 text-indigo-600">
                <Users className="size-9" />
              </div>
            </CardAction>
          </CardHeader>
          <CardFooter className="py-1.5 justify-center">
            <Link href="/dashboard/analytics">
              <Button
                variant="link"
                className="h-auto p-0 text-xs gap-1 text-muted-foreground hover:text-primary hover:no-underline group"
              >
                View details
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* BIG CARD - RECENT LOGS */}
      <Card className="rounded-md flex flex-col min-h-[300px]">
        <CardHeader className="text-gray-600">
          <CardDescription className="text-sm font-semibold flex items-center gap-2">
            <Fingerprint className="size-4 text-primary" />
            Recent Logs
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-6 pt-0">
          {recentLogs.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {recentLogs.map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 px-2 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      <Users className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {log.employee_name || "Unregistered Token"}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">
                        ID: {log.employee_id}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {log.log_time ? formatTime12h(log.log_time) : "—"}
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      {log.log_date || "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-slate-400">
              <p className="text-sm">No recent logs found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
