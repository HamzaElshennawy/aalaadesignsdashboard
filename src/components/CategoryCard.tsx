import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "./ui/card";

interface CategoryCardProps {
  id: number;
  name: string;
}

export default function CategoryCard({ id, name }: CategoryCardProps) {
  return (
    <Card className={`overflow-hidden h-52 border-none m-2`}>
      <CardContent className="p-0 h-full">
        <Link className="block h-full relative group" href={`/category/${id}`}>
          <Image
            alt={name}
            className="transition-transform duration-300 group-hover:scale-105"
            layout="fill"
            objectFit="cover"
            src={`/shirt.png`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-50" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-white text-xl font-semibold">{name}</h3>
            <p className="text-white text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore Collection
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
