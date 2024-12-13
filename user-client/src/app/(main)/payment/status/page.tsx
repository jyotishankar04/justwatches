"use client";

import { checkOrderPaymentStatus } from "@/lib/queryUtils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const params = useSearchParams();
  const transactionId = params.get("id");
  const shippingAddressId = params.get("shippingAddressId");
  const router = useRouter();
  const {} = useQuery({
    queryKey: ["checkPaymentStatus"],

    queryFn: () =>
      checkOrderPaymentStatus({
        transactionId: transactionId as string,
        shippingAddressId: shippingAddressId as string,
      }),
    onSuccess: (data) => {
      if (!data.success) {
        router.push("fail");
        toast.error(data.message);
      } else {
        router.push("success");
        toast.success(data.message);
      }
    },
    enabled: true,
  });

  return (
    <div className="flex justify-center items-center flex-col gap-5">
      <div className="mt-10">
        <span className="loading-dots loading loading-lg scale-150"></span>
      </div>
      <h1 className="text-lg">Processing your payment....</h1>
    </div>
  );
};

export default Page;
