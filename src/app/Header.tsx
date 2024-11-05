import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandInput } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

type HeaderProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
  setTheme: (theme: string) => void;
};

export default function Header({
  setIsMenuOpen,
  isDarkMode,
  setTheme,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "border-b p-4 flex items-center justify-between",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {/* Mobile Sidebar content */}
        </SheetContent>
      </Sheet>

      <div className="relative flex-1 max-w-md mx-4">
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Quick search...
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
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

      <div className="flex items-center space-x-4">
        <Switch
          checked={isDarkMode}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="mr-4"
        />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </motion.header>
  );
}
