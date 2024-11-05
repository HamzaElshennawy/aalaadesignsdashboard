"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import AnimatedShoppingBag from "./svgs/AnimatedShoppingBag";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/contexts/CartContext";
import { addToCart, removeFromCart } from "@/app/util/utils";
import { useUser } from "@/app/contexts/UserContext";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_path: string;
}

interface ProductCardProps extends Product {
  link: string;
}

export interface CartItem extends Product {
  count: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image_path,
  link,
}: ProductCardProps) {
  const { cart, setCart } = useCart();
  const [isCarted, setIsCarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    const checkIfInCart = () => {
      const productInCart = cart?.items?.some(
        (item: CartItem) => item.id === id
      );

      setIsCarted(!!productInCart);
    };

    checkIfInCart();

    const handleCartUpdate = () => checkIfInCart();

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [cart, id]);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      //set delay to 1 second
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await addToCart({
        productId: id,
        count: 1,
        user: user,
      });

      if (response && response.status === 200) {
        setIsCarted(true);
        setCart((prevCart: Cart) => ({
          ...prevCart,
          items: [
            ...(prevCart?.items || []),
            { id, name, price, image_path, count: 1 },
          ],
        }));
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setIsLoading(true);
    try {
      const response = await removeFromCart({
        productId: id,
        count: 1,
        user: user,
      });

      if (response && response.status === 200) {
        setIsCarted(false);
        setCart((prevCart: Cart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item.id !== id),
        }));
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleCartClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCarted) {
      await handleRemoveFromCart();
    } else {
      await handleAddToCart();
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-[400px] flex flex-col">
      <Link className="flex-grow" href={link}>
        <CardContent className="p-0 h-full flex flex-col">
          <div className="h-[80%] relative">
            <Image
              alt={name}
              className="w-full"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              src={image_path}
            />
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="font-bold">{price.toFixed(2)} EGP</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={
                    isLoading ? "loading" : isCarted ? "carted" : "not-carted"
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    aria-label={isCarted ? "Remove from cart" : "Add to cart"}
                    className="flex items-center justify-center"
                    disabled={isLoading}
                    size="icon"
                    onClick={handleCartClick}
                  >
                    <AnimatedShoppingBag
                      isAdding={true}
                      isInCart={isCarted}
                      isLoading={isLoading}
                    />
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
