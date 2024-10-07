"use client";

import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

const totalOrdersData1 = [
  { date: "2023-01-01", value: 400 },
  { date: "2023-01-02", value: 300 },
  { date: "2023-01-03", value: 500 },
  { date: "2023-01-04", value: 400 },
  { date: "2023-01-05", value: 700 },
  { date: "2023-01-06", value: 500 },
  { date: "2023-01-07", value: 600 },
];

const totalOrdersData2 = [
  { date: "2023-01-01", value: 300 },
  { date: "2023-01-02", value: 400 },
  { date: "2023-01-03", value: 300 },
  { date: "2023-01-04", value: 500 },
  { date: "2023-01-05", value: 400 },
  { date: "2023-01-06", value: 600 },
  { date: "2023-01-07", value: 500 },
];

const canceledOrdersData = [
  { date: "2023-01-01", value: 40 },
  { date: "2023-01-02", value: 30 },
  { date: "2023-01-03", value: 20 },
  { date: "2023-01-04", value: 50 },
  { date: "2023-01-05", value: 40 },
  { date: "2023-01-06", value: 30 },
  { date: "2023-01-07", value: 20 },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 flex flex-col border-r border-gray-200">
        <div className="mb-8">
          <img src="/logoblack.png" alt="AALAA designs" className="h-[140px]" />
        </div>
        <nav className="space-y-1 flex-grow">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] pl-2"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            Orders
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] pl-2"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Analytics
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] pl-2"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] pl-2"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Customers
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] pl-2"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Messages
          </Button>
        </nav>
        <div className="mt-auto space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] pl-2"
          >
            Logout
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] pl-2"
          >
            Settings
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-white border-gray-300"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">
                Total Orders
              </CardTitle>
              <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-1 rounded">
                This Week
              </span>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Total Orders",
                    color: "#10B981",
                  },
                }}
                className="h-[100px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={totalOrdersData1}
                    accessibilityLayer
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Line
                      type="natural"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={false}
                    />
                    {/*<ReferenceLine y={0} stroke="#000" strokeWidth={2} />*/}
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4 fill-green-600" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">
                Total Orders
              </CardTitle>
              <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-1 rounded">
                This Week
              </span>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Total Orders",
                    color: "#10B981",
                  },
                }}
                className="h-[100px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={totalOrdersData2}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={false}
                    />
                    {/*<ReferenceLine y={0} stroke="#000" strokeWidth={2} />*/}
                    <ChartTooltip
                      content={<ChartTooltipContent indicator="line" />}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="text-2xl font-bold mt-2 text-[#1E293B]">
                15481 EGP
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#64748B]">
                Canceled Orders
              </CardTitle>
              <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-1 rounded">
                This Week
              </span>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Canceled Orders",
                    color: "#EF4444",
                  },
                }}
                className="h-[80px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={canceledOrdersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#EF4444"
                      strokeWidth={3}
                      dot={false}
                    />
                    <ReferenceLine y={0} stroke="#000" strokeWidth={2} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="text-2xl font-bold mt-2 text-[#1E293B]">
                1200 EGP
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8FAFC] border-b border-gray-200">
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="text-[#64748B] font-medium">
                  Code
                </TableHead>
                <TableHead className="text-[#64748B] font-medium">
                  Date
                </TableHead>
                <TableHead className="text-[#64748B] font-medium">
                  Customer
                </TableHead>
                <TableHead className="text-[#64748B] font-medium">
                  Total
                </TableHead>
                <TableHead className="text-[#64748B] font-medium">
                  Items
                </TableHead>
                <TableHead className="text-[#64748B] font-medium">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <TableRow key={i} className="border-b border-gray-100">
                    <TableCell>
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-[#10B981] focus:ring-[#10B981]"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-[#1E293B]">
                      #1234
                    </TableCell>
                    <TableCell className="text-[#64748B]">
                      16 Feb, 2024
                    </TableCell>
                    <TableCell className="text-[#64748B]">
                      Hames Elbhennawy
                    </TableCell>
                    <TableCell className="text-[#64748B]">900EGP</TableCell>
                    <TableCell className="text-[#64748B]">
                      3 Items <ChevronDown className="inline h-4 w-4" />
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          [
                            "bg-[#DCFCE7] text-[#22C55E]",
                            "bg-[#FEF9C3] text-[#CA8A04]",
                            "bg-[#FEE2E2] text-[#EF4444]",
                          ][Math.floor(Math.random() * 3)]
                        }`}
                      >
                        {
                          ["DELIVERED", "PENDING", "CANCELED"][
                            Math.floor(Math.random() * 3)
                          ]
                        }
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] border-t border-gray-200">
            <Button
              variant="outline"
              size="sm"
              className="text-[#64748B] border-gray-300 hover:bg-[#F1F5F9] hover:text-[#475569]"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {[1, 2, 3, "...", 9, 10].map((page, index) => (
                <Button
                  key={index}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className={`${
                    page === 1
                      ? "bg-[#10B981] text-white hover:bg-[#0D9488]"
                      : "text-[#64748B] border-gray-300 hover:bg-[#F1F5F9] hover:text-[#475569]"
                  } ${page === "..." ? "pointer-events-none" : ""}`}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-[#64748B] border-gray-300 hover:bg-[#F1F5F9] hover:text-[#475569]"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
