"use client";
import OrderCard from "@/components/projectComp/main/OrderCard";
import { getAllOrders } from "@/lib/queryUtils";
import { IOrder } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  return (
    <div
      className={
        "w-full h-full flex justify-start items-center gap-4 flex-col p-4 "
      }
    >
      <h1 className={"text-xl font-bold "}>Orders</h1>
      <div className={"w-full flex justify-center items-center gap-4 flex-col"}>
        {isOrdersLoading ? (
          <h1 className={"text-xl font-semibold text-gray-400 "}>Loading...</h1>
        ) : (
          orders.data.map((order: IOrder) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
