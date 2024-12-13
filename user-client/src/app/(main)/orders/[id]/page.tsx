"use client";

import { getFormtedTime } from "@/app/utils/timeUtils";
import { getOrderById } from "@/lib/queryUtils";
import { IOrderedProduct } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id as string),
  });

  return (
    <div
      className={
        "w-full h-full flex justify-start items-center gap-4 flex-col p-4 "
      }
    >
      <h1 className={"text-xl font-bold "}>Order Details</h1>
      <div className={"w-full  gap-4 flex-row"}>
        {isLoading ? (
          <h1 className={"text-xl font-semibold text-gray-400 "}>Loading...</h1>
        ) : (
          <div className="grid grid-cols-2 w-full">
            <div
              className={
                "w-full flex justify-center items-center gap-4 flex-col"
              }
            >
              <h1 className={"text-xl font-semibold text-gray-600 "}>
                Order ID: {orderDetails?.data.id}
              </h1>
              <h1 className={"text-xl font-semibold text-gray-600 "}>
                Order Date: {getFormtedTime(orderDetails.data.createdAt)}
              </h1>
              <h1
                className={
                  "text-xl flex items-center font-semibold text-gray-600 "
                }
              >
                Total Price: <IndianRupee />
                {orderDetails?.data.totalPrice}
              </h1>
              <h1 className={"text-xl font-semibold text-gray-600 "}>
                Payment Method: {orderDetails?.data.paymentType}
              </h1>
            </div>
            <div>
              <h1
                className={"text-xl font-semibold text-center text-gray-600 "}
              >
                Ordered Products
              </h1>
              <div
                className={
                  "w-full flex-col flex justify-center items-center gap-4 mt-5"
                }
              >
                {orderDetails?.data.OrderedProducts.map(
                  (product: IOrderedProduct) => (
                    <div
                      key={product.id}
                      className={
                        "w-full flex border-black p-3 border-2 gap-5 rounded-md justify-between  items-center"
                      }
                    >
                      <div className="flex justify-start gap-5 items-center">
                        <div
                          className={"w-20 flex justify-center items-center"}
                        >
                          <Image
                            className="w-full h-full object-contain"
                            src={product.product.images[0].url}
                            alt={product.id}
                            width={150}
                            height={150}
                          />
                        </div>
                        <div>
                          <h1 className={"text-xl text-gray-800 "}>
                            {product.product.name}
                          </h1>
                          <h1
                            className={
                              "text-lg flex items-cente text-gray-600 "
                            }
                          >
                            Price: <IndianRupee /> {product.price}
                          </h1>
                          <h1 className={"text-md text-gray-600 "}>
                            Quantity: {product.quantity}
                          </h1>
                        </div>
                      </div>
                      <div>
                        <Link
                          className={
                            "text-xl bg-black hover:bg-white hover:border-2 border-2 border-black hover:text-black text-white px-4 py-2 rounded-sm duration-300"
                          }
                          href={`/products/${product.product.id}`}
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
