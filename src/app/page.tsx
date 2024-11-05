"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardContent from "./DashboardContent";
import AnalyticsContent from "./AnalyticsContent";
import CustomersContent from "./CustomersContent";
import MessagesContent from "./MessagesContent";

type ActiveTab = "dashboard" | "analytics" | "customers" | "messages";

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const isDarkMode = theme === "dark";

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
      <Sidebar
        isMenuOpen={isMenuOpen}
        setIsMenuOpenAction={setIsMenuOpen}
        isHovering={isHovering}
        setIsHoveringAction={setIsHovering}
        activeTab={activeTab}
        setActiveTabAction={setActiveTab}
        isDarkMode={isDarkMode}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          setIsMenuOpen={setIsMenuOpen}
          isDarkMode={isDarkMode}
          setTheme={setTheme}
        />

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {activeTab === "dashboard" && (
                  <DashboardContent isDarkMode={isDarkMode} />
                )}
                {activeTab === "analytics" && <AnalyticsContent />}
                {activeTab === "customers" && <CustomersContent />}
                {activeTab === "messages" && <MessagesContent />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
}
