"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  TrendingUp,
  LayoutDashboard,
  BarChart2,
  Users,
  MessageSquare,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "recharts";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandInput } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: BarChart2, label: "Analytics" },
    { icon: Users, label: "Customers" },
    { icon: MessageSquare, label: "Messages" },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const Sidebar = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Button
          variant="ghost"
          className={`w-full flex items-center transition-all duration-300 ease-in-out ${
            isMenuOpen || isHovering || isMobile
              ? "justify-start"
              : "justify-center"
          }`}
          onClick={() => !isMobile && setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-5 w-5 flex-shrink-0" />
          <span
            className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${
              isMenuOpen || isHovering || isMobile
                ? "opacity-100"
                : "opacity-0 hidden"
            }`}
          >
            Menu
          </span>
        </Button>
      </div>
      <nav className="flex-grow space-y-1 px-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full flex items-center transition-all duration-300 ease-in-out text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] ${
              isMenuOpen || isHovering || isMobile
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span
              className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${
                isMenuOpen || isHovering || isMobile
                  ? "opacity-100"
                  : "opacity-0 hidden"
              }`}
            >
              {item.label}
            </span>
          </Button>
        ))}
      </nav>
      <div className="mt-auto space-y-1 p-2">
        {[
          { icon: LogOut, label: "Logout" },
          { icon: Settings, label: "Settings" },
        ].map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full flex items-center transition-all duration-300 ease-in-out text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] ${
              isMenuOpen || isHovering || isMobile
                ? "justify-start"
                : "justify-center"
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span
              className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${
                isMenuOpen || isHovering || isMobile
                  ? "opacity-100"
                  : "opacity-0 hidden"
              }`}
            >
              {item.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block bg-white flex-col border-r border-gray-200 transition-[width] duration-300 ease-in-out overflow-hidden ${
          isMenuOpen || isHovering ? "w-64" : "w-16"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <Sidebar isMobile />
            </SheetContent>
          </Sheet>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md mx-4">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm text-muted-foreground"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search...
                  <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">Ctrl</span>K
                  </kbd>
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0">
                <Command>
                  <CommandInput placeholder="Type anything to search..." />
                </Command>
              </DialogContent>
            </Dialog>
          </div>

          {/* User avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-full">
            {/* Total Orders Chart */}
            <Card className="flex-grow bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#64748B]">
                  Total Orders
                </CardTitle>
                <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-1 rounded">
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
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>

            {/* Total Orders (Another Chart) */}
            <Card className="flex-grow bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#64748B]">
                  Total Orders
                </CardTitle>
                <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-1 rounded">
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
                <div className="text-2xl font-bold mt-2 text-[#1E293B]">
                  15481 EGP
                </div>
              </CardContent>
            </Card>

            {/* Canceled Orders Chart */}
            <Card className="flex-grow bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#64748B]">
                  Canceled Orders
                </CardTitle>
                <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-1 rounded">
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
                <div className="text-2xl font-bold mt-2 text-[#1E293B]">
                  1200 EGP
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
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
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-[#F8FAFC] border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="text-[#64748B] border-gray-300 hover:bg-[#F1F5F9] hover:text-[#475569] mb-2 sm:mb-0"
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
    </div>
  );
}
