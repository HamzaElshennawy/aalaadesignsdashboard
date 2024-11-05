import { useEffect, useState } from "react";
import { cn, User } from "@/lib/utils";
import { User as UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function CustomersContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={cn("rounded-lg shadow-sm overflow-hidden", "bg-white")}
    >
      <div className="overflow-x-auto">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow
                className={cn("border-b", "bg-[#F8FAFC] border-gray-200")}
              >
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className={cn("font-medium", "text-[#64748B]")}>
                  ID
                </TableHead>
                <TableHead className={cn("font-medium", "text-[#64748B]")}>
                  Name
                </TableHead>
                <TableHead className={cn("font-medium", "text-[#64748B]")}>
                  Email
                </TableHead>
                <TableHead className={cn("font-medium", "text-[#64748B]")}>
                  Address
                </TableHead>
                <TableHead className={cn("font-medium", "text-[#64748B]")}>
                  Role
                </TableHead>
                <TableHead className={cn("font-medium", "text-[#64748B]")}>
                  Since
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 7 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <Skeleton className="h-4 w-4 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-8" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-40" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                    </TableRow>
                  ))
                : users.map((user) => (
                    <TableRow key={user!.id}>
                      <TableCell>
                        <UserIcon className="h-4 w-4" />
                      </TableCell>
                      <TableCell>{user!.id}</TableCell>
                      <TableCell>{user!.username}</TableCell>
                      <TableCell>{user!.email}</TableCell>
                      <TableCell>{user!.address}</TableCell>
                      <TableCell>{user!.role}</TableCell>
                      <TableCell>{user!.createdat}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
}
