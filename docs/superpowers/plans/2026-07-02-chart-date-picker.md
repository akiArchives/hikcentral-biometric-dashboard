# Chart Card Date Picker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Date Picker in the weekly attendance metrics chart card header to control the active week shown and display the selected week range on its button.

**Architecture:** We will modify the shared UI `DatePicker` component to support an optional `label` prop. We'll then integrate it into the `ChartBarStacked` component header actions. Finally, we will update the `DashboardPage` to accept Next.js page search params and dynamically pass down the selected date.

**Tech Stack:** Next.js 15 (App Router), React 19, Recharts, Tailwind CSS.

## Global Constraints
- Do not break backward-compatibility of the `DatePicker` component. It is used elsewhere (e.g. `SiteHeader`) and must fallback to the standard date representation when no custom label is provided.

---

### Task 1: Update UI DatePicker component

**Files:**
- Modify: [date-picker.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/components/ui/date-picker.tsx)

**Interfaces:**
- Consumes: `selected` date string ("YYYY-MM-DD")
- Produces: `DatePicker` component that accepts optional `label` parameter:
  ```typescript
  interface DatePickerProps {
    selected: string;
    label?: string;
  }
  ```

- [ ] **Step 1: Modify interface and button rendering**
  Open [date-picker.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/components/ui/date-picker.tsx) and update it to:
  ```tsx
  interface DatePickerProps {
    selected: string; // "YYYY-MM-DD"
    label?: string; // Optional label to override the default "PPP" format
  }

  export function DatePicker({ selected, label }: DatePickerProps) {
    ...
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-auto justify-start text-left font-medium bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4 text-primary-foreground" />
            {label ? <span>{label}</span> : (date ? format(date, "PPP") : <span>Pick a date</span>)}
          </Button>
        </PopoverTrigger>
        ...
  ```
- [ ] **Step 2: Verify compiling**
  Run: `pnpm tsc --noEmit`
  Expected: Command succeeds with zero compiler errors.
- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add src/components/ui/date-picker.tsx
  git commit -m "feat(ui): add optional label support to DatePicker"
  ```

---

### Task 2: Update ChartBarStacked component

**Files:**
- Modify: [chart-bar-stacked.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/components/chart-bar-stacked.tsx)

**Interfaces:**
- Consumes: `selectedDate: string` prop from parent component.
- Produces: Integrated `DatePicker` component inside the `CardAction` slot, displaying the week range label on the button.

- [ ] **Step 1: Import DatePicker and update props**
  Open [chart-bar-stacked.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/components/chart-bar-stacked.tsx), import `DatePicker`, update `ChartBarStackedProps` to include `selectedDate`, and update `ChartBarStacked` implementation to render it in `CardAction` slot while removing the duplicate `<CardDescription>` element:
  ```tsx
  import { DatePicker } from "@/components/ui/date-picker";

  interface ChartBarStackedProps {
    data: ChartDataPoint[];
    weekRange: string;
    selectedDate: string;
  }

  export function ChartBarStacked({ data, weekRange, selectedDate }: ChartBarStackedProps) {
    return (
      <Card className="shadow-md w-full">
        <CardHeader className="text-gray-600">
          <CardTitle className="text-sm font-medium flex items-center gap-2 whitespace-nowrap">
            Weekly Attendance Metrics
          </CardTitle>
          <CardAction>
            <DatePicker selected={selectedDate} label={weekRange} />
          </CardAction>
        </CardHeader>
        ...
  ```
- [ ] **Step 2: Verify compiling**
  Run: `pnpm tsc --noEmit`
  Expected: Command succeeds with zero compiler errors (except for `page.tsx` which we will update next).
- [ ] **Step 3: Commit changes**
  Run:
  ```bash
  git add src/components/chart-bar-stacked.tsx
  git commit -m "feat(dashboard): render DatePicker inside weekly chart header"
  ```

---

### Task 3: Update Dashboard Page

**Files:**
- Modify: [page.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/app/dashboard/page.tsx)

**Interfaces:**
- Consumes: Next.js page search params promise.
- Produces: Resolved target date passed to the Supabase log query and to the `ChartBarStacked` child component.

- [ ] **Step 1: Update page component to accept searchParams**
  Open [page.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/app/dashboard/page.tsx) and update `DashboardPage` signature and date resolution:
  ```tsx
  export default async function DashboardPage({
    searchParams,
  }: {
    searchParams: Promise<{ date?: string }>;
  }) {
    const { date } = await searchParams;
    const supabase = await createClient();
    const today = date || new Date().toISOString().split("T")[0];
  ```
- [ ] **Step 2: Update ChartBarStacked instantiation**
  Find the `<ChartBarStacked ... />` call in [page.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/app/dashboard/page.tsx) and pass `selectedDate={today}`:
  ```tsx
  <ChartBarStacked
    data={chartData}
    weekRange={weekRangeLabel}
    selectedDate={today}
  />
  ```
- [ ] **Step 3: Verify compiling and run linter**
  Run: `pnpm tsc --noEmit` and `pnpm run lint`
  Expected: Commands succeed with zero errors.
- [ ] **Step 4: Commit changes**
  Run:
  ```bash
  git add src/app/dashboard/page.tsx
  git commit -m "feat(dashboard): parse searchParams and pass selectedDate to weekly chart"
  ```

---

### Task 4: Integration and Manual Verification

- [ ] **Step 1: Run comprehensive local tests**
  Run: `pnpm test`
  Expected: Existing tests pass.
- [ ] **Step 2: Run build to ensure bundle correctness**
  Run: `pnpm run build`
  Expected: Next.js build finishes successfully.
- [ ] **Step 3: Verify UI in the browser**
  Start dev server: `pnpm run dev`
  - Navigate to `/dashboard/` in the browser.
  - Verify the Weekly Attendance Metrics card has the date picker on the right of the header, showing the current week range.
  - Select a date in a different week. Verify the chart and statistics reload to display information for that selected week.
  - Navigate to `/dashboard/analytics` and verify the single-day date picker in the main header remains fully operational.
