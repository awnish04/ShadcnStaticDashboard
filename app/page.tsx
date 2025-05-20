'use client';
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import {
  Users,
Box,
  ChartLine,
  History,
} from "lucide-react";
import { AnalyticsChart } from "components/ui/analytics";
import { PieChart } from "components/ui/pie-chart";
import { BarChartComponent } from "components/ui/barchart";
import { SalesDetailsChart } from "components/ui/salesdetailschart";
import { useActivePage } from "hooks/use-active-page";
export default function Home() {
    const pageTitle = useActivePage();
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-6 w-6 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Order</CardTitle>
            <Box className="h-6 w-6 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ChartLine className="h-6 w-6 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <History className="h-6 w-6 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
          </CardContent>
        </Card>
      </div>
      <SalesDetailsChart/>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">

        <AnalyticsChart />

        <PieChart />
      </div>
      <BarChartComponent />
    </div>
  );
}
