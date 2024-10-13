"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import CustomerDetailsPage from "../customer-details/customer-details";

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
type OrderStatus = "DELIVERED" | "PENDING" | "CANCELED";

const statusColors = {
  DELIVERED: "bg-[#DCFCE7] text-[#22C55E]",
  PENDING: "bg-[#FEF9C3] text-[#CA8A04]",
  CANCELED: "bg-[#FEE2E2] text-[#EF4444]",
};

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    setIsLoaded(true);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
    { icon: BarChart2, label: "Analytics", value: "analytics" },
    { icon: Users, label: "Customers", value: "customers" },
    { icon: MessageSquare, label: "Messages", value: "messages" },
  ];

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
      <Tabs
        orientation="vertical"
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-grow"
      >
        <TabsList className="flex flex-col space-y-2 bg-transparent h-auto">
          {navItems.map((item, index) => (
            <TabsTrigger
              key={index}
              value={item.value}
              className={`w-full flex items-center px-4 py-2 transition-all duration-300 ease-in-out text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569] ${
                isMenuOpen || isHovering || isMobile
                  ? "justify-start"
                  : "justify-center"
              } ${
                activeTab === item.value ? "bg-[#F1F5F9] text-[#475569]" : ""
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
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-auto space-y-2 p-4">
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "flex h-screen",
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-[#F7F8FA] text-gray-900"
      )}
    >
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "hidden md:block flex-col border-r transition-[width] duration-300 ease-in-out overflow-hidden",
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200",
          isMenuOpen || isHovering ? "w-64" : "w-20"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Sidebar />
      </motion.aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn(
            "border-b p-4 flex items-center justify-between",
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          )}
        >
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
                  className={cn(
                    "z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 w-52 h-10 gap-2 rounded-md max-w-96 transition-transform-colors-opacity motion-reduce:transition-none text-sm font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20"
                  )}
                >
                  <svg
                    aria-hidden="true"
                    fill="none"
                    focusable="false"
                    height="18"
                    role="presentation"
                    viewBox="0 0 24 24"
                    width="18"
                    className="text-base text-default-400 pointer-events-none flex-shrink-0"
                    tabIndex={-1}
                  >
                    <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  Quick search...
                  <kbd
                    aria-hidden="true"
                    className="space-x-0.5 border rtl:space-x-reverse items-center font-sans font-normal text-center text-sm shadow-md rounded-lg py-0.5 px-2 lg:inline-block"
                  >
                    <abbr className="no-underline" title="Control">
                      ⌃
                    </abbr>
                    <span>K</span>
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

          {/* User avatar and dark mode toggle */}
          <div className="flex items-center space-x-4">
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className="mr-4"
            />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Tabs value={activeTab} className="space-y-4">
                  <TabsContent value="dashboard">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 mb-8 w-full"
                    >
                      {/* Total Orders Chart */}
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
                                  content={
                                    <ChartTooltipContent indicator="line" />
                                  }
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
                              isDarkMode
                                ? "text-gray-400"
                                : "text-muted-foreground"
                            )}
                          >
                            Showing total visitors for the last 6 months
                          </div>
                        </CardFooter>
                      </Card>

                      {/* Total Orders (Another Chart) */}
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
                                  content={
                                    <ChartTooltipContent indicator="line" />
                                  }
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

                      {/* Canceled Orders Chart */}
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
                                <ChartTooltip
                                  content={<ChartTooltipContent />}
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
                                  isDarkMode
                                    ? "text-gray-300"
                                    : "text-[#64748B]"
                                )}
                              >
                                Code
                              </TableHead>
                              <TableHead
                                className={cn(
                                  "font-medium",
                                  isDarkMode
                                    ? "text-gray-300"
                                    : "text-[#64748B]"
                                )}
                              >
                                Date
                              </TableHead>
                              <TableHead
                                className={cn(
                                  "font-medium",
                                  isDarkMode
                                    ? "text-gray-300"
                                    : "text-[#64748B]"
                                )}
                              >
                                Customer
                              </TableHead>
                              <TableHead
                                className={cn(
                                  "font-medium",
                                  isDarkMode
                                    ? "text-gray-300"
                                    : "text-[#64748B]"
                                )}
                              >
                                Total
                              </TableHead>
                              <TableHead
                                className={cn(
                                  "font-medium",
                                  isDarkMode
                                    ? "text-gray-300"
                                    : "text-[#64748B]"
                                )}
                              >
                                Items
                              </TableHead>
                              <TableHead
                                className={cn(
                                  "font-medium",
                                  isDarkMode
                                    ? "text-gray-300"
                                    : "text-[#64748B]"
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
                                const status = [
                                  "DELIVERED",
                                  "PENDING",
                                  "CANCELED",
                                ][Math.floor(Math.random() * 3)] as OrderStatus;
                                return (
                                  <TableRow
                                    key={i}
                                    className={cn(
                                      "border-b",
                                      isDarkMode
                                        ? "border-gray-700"
                                        : "border-gray-100"
                                    )}
                                  >
                                    <TableCell>
                                      <label>
                                        <input
                                          type="checkbox"
                                          className={cn(
                                            "rounded border-gray-300 text-[#10B981] focus:ring-[#10B981]",
                                            isDarkMode &&
                                              "bg-gray-700 border-gray-600"
                                          )}
                                          title="Select order"
                                        />
                                        <span className="sr-only">
                                          Select order
                                        </span>
                                      </label>
                                    </TableCell>
                                    <TableCell
                                      className={cn(
                                        "font-medium",
                                        isDarkMode
                                          ? "text-gray-200"
                                          : "text-[#1E293B]"
                                      )}
                                    >
                                      #{(1234 + i).toString().padStart(4, "0")}
                                    </TableCell>
                                    <TableCell
                                      className={
                                        isDarkMode
                                          ? "text-gray-300"
                                          : "text-[#64748B]"
                                      }
                                    >
                                      {new Date(
                                        2024,
                                        1,
                                        16 + i
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </TableCell>
                                    <TableCell
                                      className={
                                        isDarkMode
                                          ? "text-gray-300"
                                          : "text-[#64748B]"
                                      }
                                    >
                                      Customer {i + 1}
                                    </TableCell>
                                    <TableCell
                                      className={
                                        isDarkMode
                                          ? "text-gray-300"
                                          : "text-[#64748B]"
                                      }
                                    >
                                      {900 + i * 100}EGP
                                    </TableCell>
                                    <TableCell
                                      className={
                                        isDarkMode
                                          ? "text-gray-300"
                                          : "text-[#64748B]"
                                      }
                                    >
                                      {3 + i} Items{" "}
                                      <ChevronDown className="inline h-4 w-4" />
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
                  </TabsContent>
                  <TabsContent value="analytics">
                    <h2 className="text-2xl font-bold mb-4">Analytics</h2>
                    <p>Analytics content goes here.</p>
                  </TabsContent>
                  <TabsContent value="customers">
                    <CustomerDetailsPage />
                  </TabsContent>
                  <TabsContent value="messages">
                    <h2 className="text-2xl font-bold mb-4">Messages</h2>
                    <p>Messages content goes here.</p>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}
