"use client";

import { IProductDetailsCard } from "@/lib/types";
import { Heart, IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface imagesType {
  id: string;
  url: string;
}

interface PropTypes {
  name: string;
  id: number;

  images: imagesType[];
  price: number;
  isNew: boolean;
}

const ProductCard: React.FC<{ product: IProductDetailsCard }> = ({
  product,
}) => {
  const [like, setLike] = React.useState(false);
  const image = product.images[product.images.length - 1];
  return (
    <div className=" group">
      <div className="w-full h-full flex flex-col bg-white hover:ring-black hover:ring-1 hover:rounded-lg duration-300 items-center p-5 justify-center cursor-pointer   ">
        <div className="relative w-full">
          {product.isNew && product.Stocks.quantity != 0 && (
            <div className="absolute left-3 text-white bg-black px-2 py-1 rounded-2xl">
              New
            </div>
          )}
          {product.Stocks.quantity <= 0 && (
            <div className="absolute left-1 text-white bg-error px-2 py-1 rounded-2xl">
              Out of Stock
            </div>
          )}
          <div className="flex justify-end group-hover:opacity-100 opacity-0">
            <button onClick={() => setLike(!like)}>
              {like ? (
                <Heart className="text-red-500 " fill={"red"} />
              ) : (
                <Heart />
              )}
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center duration-300 ">
          <Image
            alt={product.name && product.name}
            src={image.url}
            className="w-52  h-auto object-cover object-center"
            width={200}
            height={200}
          />
        </div>

        <div className="flex flex-col duration-300 h-32 items-center justify-center ">
          <div className="group-hover:hidden flex flex-col items-center">
            <h1 className="text-xl font-bold uppercase">
              {product.name.substring(0, 15)}...
            </h1>
            <h1 className="text-2xl flex flex-row items-center font-bold uppercase">
              <IndianRupee />
              {product.price && product.price}
            </h1>
          </div>
          <div className="hidden group-hover:block ">
            <Link href={`/products/${product.id}`}>
              <button className="py-2 px-4 text-2xl z-30 border-2   hover:scale-110 duration-300 border-black  hover:border-black uppercase hover:text-white hover:bg-black">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
