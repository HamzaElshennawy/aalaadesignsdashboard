"use client";

import { Image } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  name: string;
  color: string;
  size: string;
  price: string;
  imageSrc: string;
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onQuantityChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CartItem({
  name,
  color,
  size,
  price,
  imageSrc,
  quantity,
  onIncrement,
  onDecrement,
  onQuantityChange,
}: CartItemProps) {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center space-x-4">
        <Image
          alt={name}
          className="rounded"
          height={60}
          src={imageSrc}
          width={60}
        />
        <div>
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`w-4 h-4 rounded-full bg-${color}-600`} />
            <span className="text-sm">{size}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <Button
            className={`pt-1 text-xl rounded-full text-center hover:bg-opacity-80 ${
              theme === "light" ? "border-white" : "border-red-800"
            }`}
            variant="outline"
            onClick={onDecrement}
          >
            -
          </Button>
          <Input
            className={`w-14 rounded-full text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              theme === "light" ? "border-black" : "border-red-800"
            }`}
            max="99"
            min="1"
            type="number"
            value={quantity}
            onChange={onQuantityChange}
          />
          <Button
            className={`text-xl rounded-full text-center hover:bg-opacity-80 ${
              theme === "light" ? "border-white" : "border-red-800"
            }`}
            variant="outline"
            onClick={onIncrement}
          >
            <p>+</p>
          </Button>
        </div>
      </div>
      <span className="font-semibold">{price}</span>
    </div>
  );
}
