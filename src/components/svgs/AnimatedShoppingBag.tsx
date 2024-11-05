import React from "react";
import { motion } from "framer-motion";

interface AnimatedShoppingBagProps {
  isInCart: boolean;
  isLoading: boolean;
  isAdding: boolean;
}

export default function AnimatedShoppingBag({
  isInCart,
  isLoading,
  isAdding,
}: AnimatedShoppingBagProps) {
  const bagVariants = {
    empty: {
      fill: "transparent",
      stroke: "currentColor",
    },
    filled: {
      fill: "currentColor",
      stroke: "white",
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const loadingVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  const addingVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        animate={isInCart ? "filled" : "empty"}
        d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
        initial="empty"
        transition={{ duration: 0.5 }}
        variants={bagVariants}
      />
      <motion.path
        animate={isInCart ? "filled" : "empty"}
        d="M3 6h18"
        initial="empty"
        transition={{ duration: 0.5 }}
        variants={bagVariants}
      />
      <motion.path
        animate={isInCart ? "filled" : "empty"}
        d="M16 10a4 4 0 0 1-8 0"
        initial="empty"
        transition={{ duration: 0.5 }}
        variants={bagVariants}
      />
      {isInCart && (
        <motion.circle
          animate="visible"
          cx="12"
          cy="14"
          fill="white"
          initial="hidden"
          r="2"
          transition={{ delay: 0.2, duration: 0.3 }}
          variants={itemVariants}
        />
      )}
      {!isInCart && isLoading && (
        <motion.path
          animate="visible"
          d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
          fill="none"
          initial="hidden"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          variants={loadingVariants}
        />
      )}
      {isAdding && (
        <motion.path
          animate="visible"
          d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
          fill="none"
          initial="hidden"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          transition={{
            duration: 0.75,
            ease: "easeInOut",
          }}
          variants={addingVariants}
        />
      )}
    </motion.svg>
  );
}
