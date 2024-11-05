import { motion } from "framer-motion";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { cn, User } from "@/lib/utils";
import { useEffect, useState } from "react";

type ChartData = {
  date: string;
  value: number;
};

type OrderStatus = "DELIVERED" | "PENDING" | "CANCELED";

type StatusColors = {
  [key in OrderStatus]: string;
};

const totalOrdersData1: ChartData[] = [
  { date: "2023-01-01", value: 400 },
  { date: "2023-01-02", value: 300 },
  { date: "2023-01-03", value: 500 },
  { date: "2023-01-04", value: 400 },
  { date: "2023-01-05", value: 700 },
  { date: "2023-01-06", value: 500 },
  { date: "2023-01-07", value: 600 },
];

const totalOrdersData2: ChartData[] = [
  { date: "2023-01-01", value: 300 },
  { date: "2023-01-02", value: 400 },
  { date: "2023-01-03", value: 300 },
  { date: "2023-01-04", value: 500 },
  { date: "2023-01-05", value: 400 },
  { date: "2023-01-06", value: 600 },
  { date: "2023-01-07", value: 500 },
];

const canceledOrdersData: ChartData[] = [
  { date: "2023-01-01", value: 40 },
  { date: "2023-01-02", value: 30 },
  { date: "2023-01-03", value: 20 },
  { date: "2023-01-04", value: 50 },
  { date: "2023-01-05", value: 40 },
  { date: "2023-01-06", value: 30 },
  { date: "2023-01-07", value: 20 },
];

const statusColors: StatusColors = {
  DELIVERED: "bg-[#DCFCE7] text-[#22C55E]",
  PENDING: "bg-[#FEF9C3] text-[#CA8A04]",
  CANCELED: "bg-[#FEE2E2] text-[#EF4444]",
};

type DashboardContentProps = {
  isDarkMode: boolean;
};

export default function DashboardContent({
  isDarkMode,
}: DashboardContentProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full"
      >
        {/* Total Orders Chart*/}
        <Card
          className={cn(
            "flex-grow shadow-sm",
            isDarkMode ? "bg-gray-800" : "bg-white"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-200" : "text-[#64748B]"
              )}
            >
              Total Orders
            </CardTitle>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded",
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-[#F1F5F9] text-[#64748B]"
              )}
            >
              This Week
            </span>
          </CardHeader>
          <CardContent className="h-[200px] md:h-[250px]">
            <ChartContainer
              config={{
                value: {
                  label: "Total Orders",
                  color: "#10B981",
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={totalOrdersData1}
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
            <div
              className={cn(
                "leading-none",
                isDarkMode ? "text-gray-400" : "text-muted-foreground"
              )}
            >
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>

        {/*Another Total Orders Chart*/}
        <Card
          className={cn(
            "flex-grow shadow-sm",
            isDarkMode ? "bg-gray-800" : "bg-white"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-200" : "text-[#64748B]"
              )}
            >
              Total Orders
            </CardTitle>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded",
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-[#F1F5F9] text-[#64748B]"
              )}
            >
              This Week
            </span>
          </CardHeader>
          <CardContent className="h-[200px] md:h-[250px]">
            <ChartContainer
              config={{
                value: {
                  label: "Total Orders",
                  color: "#10B981",
                },
              }}
              className="h-full w-full"
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
                  <ChartTooltip
                    content={<ChartTooltipContent indicator="line" />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div
              className={cn(
                "text-2xl font-bold mt-2",
                isDarkMode ? "text-gray-100" : "text-[#1E293B]"
              )}
            >
              15481 EGP
            </div>
          </CardContent>
        </Card>

        {/*Canceled Orders Chart*/}
        <Card
          className={cn(
            "flex-grow shadow-sm",
            isDarkMode ? "bg-gray-800" : "bg-white"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle
              className={cn(
                "text-sm font-medium",
                isDarkMode ? "text-gray-200" : "text-[#64748B]"
              )}
            >
              Canceled Orders
            </CardTitle>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded",
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-[#F1F5F9] text-[#64748B]"
              )}
            >
              This Week
            </span>
          </CardHeader>
          <CardContent className="h-[200px] md:h-[250px]">
            <ChartContainer
              config={{
                value: {
                  label: "Canceled Orders",
                  color: "#EF4444",
                },
              }}
              className="h-full w-full"
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div
              className={cn(
                "text-2xl font-bold mt-2",
                isDarkMode ? "text-gray-100" : "text-[#1E293B]"
              )}
            >
              1200 EGP
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={cn(
          "rounded-lg shadow-sm overflow-hidden",
          isDarkMode ? "bg-gray-800" : "bg-white"
        )}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow
                className={cn(
                  "border-b",
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-[#F8FAFC] border-gray-200"
                )}
              >
                <TableHead className="w-[50px]"></TableHead>
                <TableHead
                  className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-[#64748B]"
                  )}
                >
                  Code
                </TableHead>
                <TableHead
                  className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-[#64748B]"
                  )}
                >
                  Date
                </TableHead>
                <TableHead
                  className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-[#64748B]"
                  )}
                >
                  Customer
                </TableHead>
                <TableHead
                  className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-[#64748B]"
                  )}
                >
                  Total
                </TableHead>
                <TableHead
                  className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-[#64748B]"
                  )}
                >
                  Items
                </TableHead>
                <TableHead
                  className={cn(
                    "font-medium",
                    isDarkMode ? "text-gray-300" : "text-[#64748B]"
                  )}
                >
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(8)
                .fill(null)
                .map((_, i) => {
                  const status = ["DELIVERED", "PENDING", "CANCELED"][
                    Math.floor(Math.random() * 3)
                  ] as OrderStatus;
                  return (
                    <TableRow
                      key={i}
                      className={cn(
                        "border-b",
                        isDarkMode ? "border-gray-700" : "border-gray-100"
                      )}
                    >
                      <TableCell>
                        <label>
                          <input
                            type="checkbox"
                            className={cn(
                              "rounded border-gray-300 text-[#10B981] focus:ring-[#10B981]",
                              isDarkMode && "bg-gray-700 border-gray-600"
                            )}
                            title="Select order"
                          />
                          <span className="sr-only">Select order</span>
                        </label>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "font-medium",
                          isDarkMode ? "text-gray-200" : "text-[#1E293B]"
                        )}
                      >
                        #{(1234 + i).toString().padStart(4, "0")}
                      </TableCell>
                      <TableCell
                        className={
                          isDarkMode ? "text-gray-300" : "text-[#64748B]"
                        }
                      >
                        {new Date(2024, 1, 16 + i).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell
                        className={
                          isDarkMode ? "text-gray-300" : "text-[#64748B]"
                        }
                      >
                        Customer {i + 1}
                      </TableCell>
                      <TableCell
                        className={
                          isDarkMode ? "text-gray-300" : "text-[#64748B]"
                        }
                      >
                        {900 + i * 100}EGP
                      </TableCell>
                      <TableCell
                        className={
                          isDarkMode ? "text-gray-300" : "text-[#64748B]"
                        }
                      >
                        {3 + i} Items <ChevronDown className="inline h-4 w-4" />
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}
                        >
                          {status}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t",
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-[#F8FAFC] border-gray-200"
          )}
        >
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "mb-2 sm:mb-0",
              isDarkMode
                ? "text-gray-300 border-gray-600 hover:bg-gray-800"
                : "text-[#64748B] border-gray-300 hover:bg-[#F1F5F9] hover:text-[#475569]"
            )}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            {[1, 2, 3, "...", 9, 10].map((page, index) => (
              <Button
                key={index}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className={cn(
                  page === 1
                    ? "bg-[#10B981] text-white hover:bg-[#0D9488]"
                    : isDarkMode
                    ? "text-gray-300 border-gray-600 hover:bg-gray-800"
                    : "text-[#64748B] border-gray-300 hover:bg-[#F1F5F9] hover:text-[#475569]",
                  page === "..." && "pointer-events-none"
                )}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              isDarkMode
                ? "text-gray-300 border-gray-600 hover:bg-gray-800"
                : "text-[#64748B] border-gray-300 hover:bg-[#F1F5F9] hover:text-[#475569]"
            )}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </>
  );
}
