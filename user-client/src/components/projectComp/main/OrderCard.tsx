import React from "react";
import Link from "next/link";
import { IOrder } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/lib/queryUtils";
import { getFormtedTime } from "@/app/utils/timeUtils";
import { IndianRupee } from "lucide-react";

const OrderCard: React.FC<{ order: IOrder }> = ({ order }) => {
  return (
    <div className="w-full flex justify-center items-center gap-4 flex-col bg-white p-4">
      <div className="w-full flex justify-center items-center gap-4 flex-col">
        <div className="w-full flex justify-between items-center gap-4">
          <div className="w-1/3 flex justify-center items-center gap-4 flex-col">
            <h1 className="text-xl font-semibold capitalize">
              Status: {order.status}
            </h1>
            <h1 className="text-lg text-gray-400">
              Order Date: {getFormtedTime(order.createdAt)}
            </h1>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-4 flex-col">
            <h1 className="text-xl flex items-center font-semibold">
              Total: <IndianRupee />
              {order.totalPrice}
            </h1>
            <h1 className="text-lg text-gray-400">
              Payment Method: {order.paymentType}
            </h1>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-4 flex-col">
            <Link
              href={"/orders/" + order.id}
              className={
                "bg-black text-white rounded-sm px-4 py-2 hover:bg-white hover:text-black hover:border-2 hover:border-black duration-300 "
              }
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
