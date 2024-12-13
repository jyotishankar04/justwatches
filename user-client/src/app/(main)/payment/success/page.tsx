"use client";

import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const queryClient = useQueryClient();
  const orderDetails = queryClient.getQueryData(["checkPaymentStatus"]);
  if (!orderDetails) return null;
  if (!orderDetails.success) return null;

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-5">
      <CheckCircle className="w-52 h-52 text-green-600 font-normal" />
      <h1 className="text-3xl mb-5 font-bold text-green-500">
        Payment Successfully
      </h1>
      <Link
        href={`/orders/${orderDetails.data.orderDetails.id}`}
        className="bg-black text-white py-4 text-xl  px-10 hover:text-white hover:bg-heroOrange"
      >
        View Order Details
      </Link>
    </div>
  );
};

export default Page;
