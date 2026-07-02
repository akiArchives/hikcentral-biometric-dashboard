# Design Spec: Chart Card Date Picker (Weekly Control)

Add a date picker directly in the header of the weekly attendance metrics chart card. This date picker will control the active week shown by the chart and display the currently selected week range on its button label.

## User Review Required

No critical review blocks. The user has clarified that:
- The date picker should control the week for the chart.
- The button label should display the selected week range (e.g., "June 22 - 26").
- The change must be backward-compatible so it doesn't break the existing DatePicker usage in the main site header.

## Proposed Changes

### Component: UI Shared Components

#### [MODIFY] [date-picker.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/components/ui/date-picker.tsx)
- Add an optional `label?: string` prop to the `DatePickerProps` interface.
- If `label` is provided, render it on the popover button instead of formatting the single selected date with `format(date, "PPP")`.
- Default to current behavior if `label` is not provided (ensuring backward compatibility with `SiteHeader` at `/dashboard/analytics`).

---

### Component: Dashboard Dashboard Features

#### [MODIFY] [chart-bar-stacked.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/components/chart-bar-stacked.tsx)
- Accept `selectedDate: string` as a new prop.
- Import `DatePicker` from `@/components/ui/date-picker`.
- Inside `<CardHeader>`, place `<DatePicker selected={selectedDate} label={weekRange} />` inside the `<CardAction>` slot.
- Remove the `<CardDescription>` to avoid displaying the week range twice in the header.

#### [MODIFY] [page.tsx](file:///c:/Users/wakie/Documents/Projects/clifsa-attendance/attendance-dashboard/src/app/dashboard/page.tsx)
- Modify the `DashboardPage` component signature to accept Next.js Page `searchParams`:
  ```tsx
  export default async function DashboardPage({
    searchParams,
  }: {
    searchParams: Promise<{ date?: string }>;
  }) {
    const { date } = await searchParams;
    const today = date || new Date().toISOString().split("T")[0];
    ...
  ```
- Pass the resolved `today` (which represents the selected date) as `selectedDate` to the `ChartBarStacked` component:
  ```tsx
  <ChartBarStacked
    data={chartData}
    weekRange={weekRangeLabel}
    selectedDate={today}
  />
  ```

---

## Verification Plan

### Automated Verification
- Run typescript compilation and lint checks to ensure all components compile without error:
  `pnpm tsc --noEmit`
- Run local development server and check for build/compile errors.

### Manual Verification
- Navigate to `/dashboard/` in the browser.
- Verify the weekly chart card header has a date picker button on the right side.
- Verify the button shows the current week range (e.g. "June 22 - 26").
- Click the button, select a different date from the calendar popover.
- Verify the page reloads with the new `?date=YYYY-MM-DD` query parameter.
- Verify the chart updates to display metrics for the week containing that selected date.
- Navigate to `/dashboard/analytics` and verify the single-day date picker in the header is unaffected and still functions correctly.
