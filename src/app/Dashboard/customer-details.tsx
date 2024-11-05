"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
} from "lucide-react";
import { cn, User } from "@/lib/utils";

type PurchaseHistory = {
  id: string;
  date: string;
  items: string;
  total: number;
};

type SpendingData = {
  name: string;
  amount: number;
};

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalSpent: number;
  orders: number;
  status: string;
  avatar: string;
  notes: string;
};

type TabContent = {
  purchases: {
    title: string;
    content: React.ReactNode;
  };
  analytics: {
    title: string;
    content: React.ReactNode;
  };
  notes: {
    title: string;
    content: React.ReactNode;
  };
};

type AnimatedTabsProps = {
  isDarkMode: boolean;
  purchaseHistory: PurchaseHistory[];
  spendingData: SpendingData[];
  customer: Customer;
  isEditing: boolean;
  handleInputChangeAction: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function AnimatedTabs({
  isDarkMode,
  purchaseHistory,
  spendingData,
  customer,
  isEditing,
  handleInputChangeAction,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState<keyof TabContent>("purchases");

  const tabContent: TabContent = {
    purchases: {
      title: "Purchase History",
      content: (
        <Table>
          <TableHeader>
            <TableRow className={isDarkMode ? "border-gray-700" : ""}>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>
                Order ID
              </TableHead>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>
                Date
              </TableHead>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>
                Items
              </TableHead>
              <TableHead className={isDarkMode ? "text-gray-300" : ""}>
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseHistory.map((purchase) => (
              <TableRow
                key={purchase.id}
                className={
                  isDarkMode
                    ? "border-gray-700 hover:bg-gray-700/50"
                    : "hover:bg-gray-100"
                }
              >
                <TableCell className="font-medium">{purchase.id}</TableCell>
                <TableCell>{purchase.date}</TableCell>
                <TableCell>{purchase.items}</TableCell>
                <TableCell>${purchase.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ),
    },
    analytics: {
      title: "Spending Analytics",
      content: (
        <ChartContainer
          config={{
            value: {
              label: "Total Spendings",
              color: "#10B981",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingData}>
              <CartesianGrid
                strokeDasharray="15 15"
                stroke={isDarkMode ? "#4B5563" : "#E5E7EB"}
              />
              <XAxis
                dataKey="name"
                stroke={isDarkMode ? "#9CA3AF" : "#4B5563"}
              />
              <YAxis stroke={isDarkMode ? "#9CA3AF" : "#4B5563"} />
              <ChartTooltip
                content={<ChartTooltipContent indicator="line" />}
                contentStyle={{
                  backgroundColor: isDarkMode ? "#ffffff" : "#ffffff",
                  borderColor: isDarkMode ? "#ffffff" : "#000000",
                  color: isDarkMode ? "#ffffff" : "#374151",
                  borderRadius: "1rem",
                  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.05)",
                }}
              />
              <Line
                type="natural"
                dataKey="amount"
                stroke="#10B981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      ),
    },
    notes: {
      title: "Customer Notes",
      content: isEditing ? (
        <Textarea
          name="notes"
          value={customer.notes}
          onChange={handleInputChangeAction}
          rows={5}
          className={cn(
            "w-full",
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-100"
              : "bg-white border-gray-300"
          )}
        />
      ) : (
        <p>{customer.notes}</p>
      ),
    },
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value: string) => setActiveTab(value as keyof TabContent)}
      className="space-y-4"
    >
      <TabsList className={cn(isDarkMode ? "bg-gray-800" : "bg-gray-200")}>
        {Object.keys(tabContent).map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className={cn(
              "relative",
              isDarkMode ? "data-[state=active]:bg-gray-700" : ""
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Card
            className={cn(
              "transition-colors",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            )}
          >
            <CardHeader>
              <CardTitle className={isDarkMode ? "text-gray-100" : ""}>
                {tabContent[activeTab].title}
              </CardTitle>
            </CardHeader>
            <CardContent>{tabContent[activeTab].content}</CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}
export default function CustomerDetailsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Customer data
  const [customer, setCustomer] = useState({
    id: 1,
    name: "Emily Johnson",
    email: "emily@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joinDate: "2022-03-15",
    totalSpent: 1960,
    orders: 28,
    status: "Active",
    avatar: "/placeholder.svg?height=128&width=128",
    notes:
      "Prefers eco-friendly products. Often shops for seasonal collections.",
  });

  // Purchase history data
  const purchaseHistory = [
    {
      id: "ORD-001",
      date: "2023-05-01",
      items: "Summer Dress, Sandals",
      total: 129.99,
    },
    {
      id: "ORD-002",
      date: "2023-04-15",
      items: "Denim Jacket, T-shirt",
      total: 159.99,
    },
    {
      id: "ORD-003",
      date: "2023-04-01",
      items: "Sneakers, Socks",
      total: 89.99,
    },
    {
      id: "ORD-004",
      date: "2023-03-20",
      items: "Sunglasses, Beach Bag",
      total: 79.99,
    },
    {
      id: "ORD-005",
      date: "2023-03-01",
      items: "Winter Coat, Scarf",
      total: 199.99,
    },
  ];

  // Spending data for the chart
  const spendingData = [
    { name: "Jan", amount: 250 },
    { name: "Feb", amount: 300 },
    { name: "Mar", amount: 280 },
    { name: "Apr", amount: 350 },
    { name: "May", amount: 400 },
    { name: "Jun", amount: 380 },
  ];

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Here you would typically save the changes to the backend
      console.log("Saving changes:", customer);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className={cn(
        "min-h-screen p-8 transition-colors duration-200",
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      )}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Customer Details</h1>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleEditToggle}
              variant="outline"
              className={cn(
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                  : "bg-white hover:bg-gray-100"
              )}
            >
              {isEditing ? (
                <Save className="mr-2 h-4 w-4" />
              ) : (
                <Edit className="mr-2 h-4 w-4" />
              )}
              {isEditing ? "Save Changes" : "Edit Customer"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card
            className={cn(
              "md:col-span-2 transition-colors",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            )}
          >
            <CardHeader>
              <CardTitle className={isDarkMode ? "text-gray-100" : ""}>
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  {isEditing ? (
                    <Input
                      name="name"
                      value={customer.name}
                      onChange={handleInputChange}
                      className={cn(
                        "text-2xl font-semibold mb-2",
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-white border-gray-300"
                      )}
                    />
                  ) : (
                    <h2 className="text-2xl font-semibold">{customer.name}</h2>
                  )}
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        className={cn(
                          "flex-1",
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        )}
                      />
                    ) : (
                      <span>{customer.email}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        className={cn(
                          "flex-1",
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        )}
                      />
                    ) : (
                      <span>{customer.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        name="address"
                        value={customer.address}
                        onChange={handleInputChange}
                        className={cn(
                          "flex-1",
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300"
                        )}
                      />
                    ) : (
                      <span>{customer.address}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Customer since: {customer.joinDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "transition-colors",
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
            )}
          >
            <CardHeader>
              <CardTitle className={isDarkMode ? "text-gray-100" : ""}>
                Customer Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Spent:</span>
                  <span className="text-2xl font-bold">
                    ${customer.totalSpent.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Orders:</span>
                  <span className="text-2xl font-bold">{customer.orders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge
                    variant={
                      customer.status === "Active" ? "default" : "secondary"
                    }
                  >
                    {customer.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <AnimatedTabs
          isDarkMode={isDarkMode}
          purchaseHistory={purchaseHistory}
          spendingData={spendingData}
          customer={customer}
          isEditing={isEditing}
          handleInputChangeAction={handleInputChange}
        />
      </div>
    </div>
  );
}
