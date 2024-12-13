"use client";
import Image from "next/image";
import { GrView } from "react-icons/gr";
import React, { useRef } from "react";
import Link from "next/link";
import { IoCheckboxOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCartItems,
  removeFromCart,
  updateCartCount,
} from "@/lib/queryUtils";
import { ICartItem } from "@/lib/types";
import toast from "react-hot-toast";
import { IndianRupee, Trash2 } from "lucide-react";

const Page = () => {
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (cartItems.data.cartItems.length <= 0) {
    return (
      <div className="container flex flex-col items-center justify-start h-full">
        <div className="px-5 flex flex-col gap-4 items-center grow w-full">
          <h1 className="text-black text-2xl font-bold">Your cart is empty</h1>
          <Link href="/collections">
            <div className="btn bg-black hover:bg-white hover:text-black hover:ring-1 btn-lg hover:ring-black rounded-sm text-white text-xl">
              Continue Shopping
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-start h-full">
      <div className="px-5 flex flex-col gap-4 items-center grow w-full">
        {cartItems?.data.cartItems.map((item: ICartItem) => (
          <CartCard
            key={item.id}
            data={{
              quantity: item.quantity,
              model: item.product.name,
              productId: item.product.id,
              price: String(item.product.price),
              image: item.product.images[0].url,
              cartItemId: item.id,

              // here the cart id  cartItem is and the product id is the product id of the product in the cart
            }}
          />
        ))}
      </div>
      <div className="p-4 w-full bg-gray-300 flex flex-row justify-between items-center">
        <div>
          <h1 className="text-black text-2xl font-bold flex items-center gap-2">
            Total: <IndianRupee /> {cartItems.data.checkoutPrice}
          </h1>
        </div>
        <div>
          {cartItems.data.checkoutPrice > 0 && (
            <Link
              href="/checkout"
              className="btn bg-black hover:bg-white hover:text-black hover:ring-1 btn-lg hover:ring-black rounded-sm text-white text-xl"
            >
              Checkout <IoCheckboxOutline />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const CartCard: React.FC<{
  data: {
    model: string;
    image: string;
    quantity: number;
    price: string;
    productId: string;
    cartItemId: string;
  };
}> = ({ data: item }) => {
  const queryClient = useQueryClient();

  const { mutate: increaseCount, isLoading: isUpdating } = useMutation({
    mutationFn: async ({
      itemId,
      count,
    }: {
      itemId: string;
      count: number;
    }) => {
      return await updateCartCount(itemId, count);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
      }
      queryClient.invalidateQueries(["cartItems"]);
    },
    onError: (error) => {
      queryClient.invalidateQueries(["cartItems"]);
      console.error(error);
      toast.error("Failed to update");
    },
  });
  const { mutate: removeCartMutate, isLoading: isRemoving } = useMutation({
    mutationFn: () => removeFromCart(item.productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });
  return (
    <div
      className="w-full grid grid-cols-5 items-center p-4 bg-white rounded-sm"
      key={item.cartItemId}
    >
      <div className="w-full flex justify-center items-center">
        <div className="w-20 rounded-sm aspect-square flex justify-center items-center overflow-hidden group">
          <Image
            src={item.image}
            alt={item.model}
            width={200}
            height={200}
            className="w-full h-full object-cover object-center group-hover:scale-110 duration-150"
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-xl font-semibold">{item.model}</h1>
      </div>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-lg flex items-center gap-2 text-yellow-500">
          <IndianRupee /> {item.price}
        </h1>
      </div>
      <div className="w-full flex justify-center text-lg items-center">
        {!isUpdating ? (
          <select
            id="productCount"
            className="select"
            defaultValue={item.quantity}
            disabled={isUpdating}
            onChange={(e) => {
              increaseCount({
                itemId: item.cartItemId,
                count: Number(e.currentTarget.value),
              });
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </div>
      <div className="w-full p-4 gap-4 grid-cols-2 grid">
        <Link
          href={`/products/${item.productId}`}
          className="btn text-white rounded-sm text-lg btn-success"
        >
          <GrView />
        </Link>
        <button
          onClick={() => removeCartMutate()}
          className="btn text-white rounded-sm text-lg btn-error flex flex-row items-center justify-center"
        >
          {isRemoving ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Trash2 />
          )}
        </button>
      </div>
    </div>
  );
};

export default Page;
