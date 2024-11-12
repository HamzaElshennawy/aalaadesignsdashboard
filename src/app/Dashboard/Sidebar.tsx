"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Menu,
  LayoutDashboard,
  BarChart2,
  Users,
  MessageSquare,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import { motion } from "framer-motion";

type ActiveTab =
  | "dashboard"
  | "analytics"
  | "customers"
  | "messages"
  | "products";

type NavItem = {
  icon: React.ElementType;
  label: string;
  value: string;
};

type SidebarProps = {
  isMenuOpen: boolean;
  setIsMenuOpenAction: React.Dispatch<React.SetStateAction<boolean>>;
  isHovering: boolean;
  setIsHoveringAction: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: ActiveTab;
  setActiveTabAction: React.Dispatch<React.SetStateAction<ActiveTab>>;
  isDarkMode: boolean;
};

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", value: "dashboard" },
  { icon: BarChart2, label: "Analytics", value: "analytics" },
  { icon: Users, label: "Customers", value: "customers" },
  { icon: MessageSquare, label: "Messages", value: "messages" },
  { icon: Package, label: "Products", value: "products" },
];

export default function Sidebar({
  isMenuOpen,
  setIsMenuOpenAction,
  isHovering,
  setIsHoveringAction,
  activeTab,
  setActiveTabAction,
  isDarkMode,
}: SidebarProps) {
  const handleTabChange = (value: string) => {
    setActiveTabAction(value as ActiveTab);
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "hidden md:block flex-col border-r transition-[width] duration-300 ease-in-out overflow-hidden",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        isMenuOpen || isHovering ? "w-64" : "w-20"
      )}
      onMouseEnter={() => setIsHoveringAction(true)}
      onMouseLeave={() => setIsHoveringAction(false)}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center transition-all duration-300 ease-in-out",
              isMenuOpen || isHovering ? "justify-start" : "justify-center"
            )}
            onClick={() => setIsMenuOpenAction(!isMenuOpen)}
          >
            <Menu className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                "ml-3 whitespace-nowrap transition-opacity duration-300",
                isMenuOpen || isHovering ? "opacity-100" : "opacity-0 hidden"
              )}
            >
              Menu
            </span>
          </Button>
        </div>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex-grow"
        >
          <TabsList className="flex flex-col space-y-2 bg-transparent h-auto">
            {navItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={cn(
                  "w-full flex items-center px-4 py-2 transition-all duration-300 ease-in-out text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569]",
                  isMenuOpen || isHovering ? "justify-start" : "justify-center",
                  activeTab === item.value ? "bg-[#F1F5F9] text-[#475569]" : ""
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={cn(
                    "ml-3 whitespace-nowrap transition-opacity duration-300",
                    isMenuOpen || isHovering
                      ? "opacity-100"
                      : "opacity-0 hidden"
                  )}
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
          ].map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full flex items-center transition-all duration-300 ease-in-out text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#475569]",
                isMenuOpen || isHovering ? "justify-start" : "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span
                className={cn(
                  "ml-3 whitespace-nowrap transition-opacity duration-300",
                  isMenuOpen || isHovering ? "opacity-100" : "opacity-0 hidden"
                )}
              >
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
