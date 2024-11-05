import { ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  const router = useRouter();

  const handleStartShopping = async () => {
    router.push("../products");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
          <div className="relative bg-white p-6 rounded-full shadow-lg">
            <ShoppingBag className="w-16 h-16 text-primary" />
          </div>
        </div>
        <h2 className="mt-8 text-3xl font-bold text-gray-900">
          Your cart is empty
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
          Looks like you haven&apos;t added anything to your cart yet. Start
          shopping and discover amazing products!
        </p>
        <Button
          className="mt-8 px-6 py-3 text-lg font-semibold"
          size="lg"
          onClick={handleStartShopping}
        >
          Start Shopping
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
      <motion.div
        animate={{ opacity: 1 }}
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-800">Need help?</h3>
        <p className="mt-2 text-gray-600">
          Our customer support team is available 24/7
        </p>
        <Button
          className="mt-2 text-primary hover:text-primary/80"
          variant="link"
        >
          Contact Support
        </Button>
      </motion.div>
    </div>
  );
}
