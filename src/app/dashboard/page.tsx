import { Button } from "@/components/ui/button";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import {
  Card,
  CardDescription,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarCheck2,
  UserRoundX,
  ClockAlert,
  Users,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="w-full h-full pb-10 mt-5 px-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="ml-3 flex flex-row items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-700">
            Dashboard
          </h1>
          <Separator orientation="vertical" />
          <p className="text-sm text-gray-400">Example</p>
        </div>
      </div>

      {/*Cards*/}
      <div className="grid grid-cols-4 gap-6 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Present</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              16
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Late</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Down 20% this period <IconTrendingDown className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Acquisition needs attention
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Absent</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              2
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Strong user retention <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Engagement exceed targets
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Employees</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              16
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Steady performance increase <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Meets growth projections
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Card Rows */}
      <div className="flex flex-row gap-6 w-full">
        {/*Present*/}
        {/*<Card className="rounded-md w-full gap-0">
          <CardHeader className=" text-gray-600">
            <CardTitle className="text-sm font-semibold">
              Present Today
            </CardTitle>
            <CardAction className="flex w-15 h-15">
              <Button
                variant="outline"
                className="justify-center items-center size-fit p-2 bg-emerald-100 text-emerald-700 border-emerald- hover:bg-green-600/80 hover:text-primary-foreground"
              >
                <CalendarCheck2 strokeWidth={1.5} className="size-11 " />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="">
            <p className="font-bold text-5xl text-gray-700 -mt-8.75">14</p>
          </CardContent>
        </Card>*/}

        {/* Absent */}
        {/*<Card className="rounded-md w-full gap-0">
          <CardHeader className=" text-gray-600">
            <CardTitle className="text-sm font-semibold">
              Absent Today
            </CardTitle>
            <CardAction className="flex w-15 h-15">
              <Button
                variant="outline"
                className="justify-center items-center size-fit p-2 bg-red-100 text-red-600  hover:bg-red-600/80 hover:text-primary-foreground"
              >
                <UserRoundX strokeWidth={1.5} className="size-11 " />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="">
            <p className="font-bold text-5xl text-gray-700 mt-[-35px]">2</p>
          </CardContent>
        </Card>*/}

        {/*Late*/}
        {/*<Card className="rounded-md w-full gap-0">
          <CardHeader className=" text-gray-600">
            <CardTitle className="text-sm font-semibold">Late Today</CardTitle>
            <CardAction className="flex w-15 h-15">
              <Button
                variant="outline"
                className="justify-center items-center size-fit p-2 bg-amber-500 w-full h-full text-primary-foreground hover:bg-amber-500/80 hover:text-primary-foreground"
              >
                <ClockAlert strokeWidth={1.5} className="size-11 " />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="">
            <p className="font-bold text-5xl text-gray-700 mt-[-35px]">1</p>
          </CardContent>
        </Card>*/}

        {/* TOTAL EMPLOYEES */}
        {/*<Card className="rounded-md w-full gap-0">
          <CardHeader className=" text-gray-600">
            <CardTitle className="text-sm font-semibold">
              Total Employees
            </CardTitle>
            <CardAction className="flex w-15 h-15">
              <Button
                variant="outline"
                className="justify-center items-center size-fit p-2 bg-primary w-full h-full text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
              >
                <Users strokeWidth={1.5} className="size-11 " />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="">
            <p className="font-bold text-5xl text-gray-700 mt-[-35px]">16</p>
          </CardContent>
        </Card>
      </div>*/}

      {/* BIG CARD*/}
      <Card className="rounded-md flex-1">
        <CardHeader className=" text-gray-600">
          <CardTitle className="text-sm font-semibold">Recent Logs</CardTitle>
        </CardHeader>
        <CardContent className=""></CardContent>
      </Card>
    </div>
  );
}
