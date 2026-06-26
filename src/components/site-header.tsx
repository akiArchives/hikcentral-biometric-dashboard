import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBrandGithub } from "@tabler/icons-react";

export async function SiteHeader() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <header className="flex h-17.25 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14.25">
      <div className="flex w-full items-center gap-1 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-7"
        />
        <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-7"
        />

        <p className="text-sm text-gray-400">Overview</p>

        <div className="ml-auto flex items-center gap-2">
          <p className="text-xs text-gray-400 mt-1">Today: {today}</p>
          <Button variant="ghost" className="ml-auto" asChild>
            <a
              href="https://github.com/akiArchives/Biometric-Attendance-Dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="size-fit m-0 dark:text-foreground"
            >
              <IconBrandGithub className="size-6 text-gray-700" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
