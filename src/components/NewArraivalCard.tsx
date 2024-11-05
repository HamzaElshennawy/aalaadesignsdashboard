import React from "react";
import { Card, Button } from "@nextui-org/react";

import Shoppingbag from "@/components/svgs/Shoppingbag";

interface NewArraivalCardProps {
  name: string;
  description?: string;
  price?: string;
  isLiked?: boolean;
  isInCart?: boolean;
  path: string;
}

function NewArraivalCard({
  name,
  description,
  price,
  path,
  //isLiked = false,
  //isInCart = false,
}: NewArraivalCardProps) {
  return (
    <>
      <Card
        disableRipple
        isHoverable
        className="max-w-sm w-[21rem] h-[33rem] m-2  flex flex-col bg-white bg-opacity-none  justify-center bg-cover bg-center hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
        style={{
          backgroundImage: `url('${path}')`,
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black " />
          <div className="absolute bottom-0 left-0 right-0 p-2 rounded-md text-black w-11/12 text-left m-auto z-20 ">
            <p className="text-lg  text-white">{name}</p>
            <p className="text-md font-extralight text-white">{description}</p>
            <p className="text-xl font-bold text-white">{price} EGP</p>
          </div>

          <div className="absolute bottom-3 right-0 py-2 rounded-md w-11/12 text-right text-white m-auto z-20 mt-auto">
            <Button className="text-white" variant="light">
              <Shoppingbag IsInCart={false} />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default NewArraivalCard;
