"use client";

import FeatureCard from "@/components/projectComp/main/FeatureCard";
import ImageViewer from "@/components/projectComp/main/ImageViewer";
import { ProductRightCard } from "@/components/projectComp/main/ProductDetailsCard";
import { getCartItems, getProductById } from "@/lib/queryUtils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { product } = useParams();
  const { data: productDetails, isLoading: isProductLoading } = useQuery({
    queryKey: ["product", { product }],
    queryFn: () => getProductById(product as string),
    enabled: !!product,
  });

  const { data: cartItems, isLoading: isCartLoading } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: true,
  });

  if (isProductLoading || isCartLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="w-full h-full  bg-white">
      <div className="w-full grid grid-cols-2 mb-10 h-auto">
        <div className="w-full h-full">
          <ImageViewer images={productDetails?.data?.images || []} />
        </div>
        <div className="w-full h-full">
          <ProductRightCard product={productDetails.data} cart={cartItems} />
        </div>
      </div>
      <div
        id="full-description"
        className="flex flex-col items-center justify-around bg-gray-100 "
      >
        <div className="container  m-auto p-10  grid items-center grid-cols-3">
          <div className="col-span-2 flex flex-col gap-2">
            <h3 className="text-2xl uppercase font-bold">
              {productDetails?.data?.name}
            </h3>
            <h4 className="text-xl opacity-60">{productDetails?.data?.name}</h4>
            <p className="text-md leading-6 opacity-80 text-gray-700">
              {productDetails?.data?.description}
            </p>
          </div>
          <div className="w-full flex justify-center items-center p-10">
            <Image
              alt="image"
              className="w-60 object-contain object-center"
              src={
                productDetails?.data?.images[
                  productDetails?.data?.images.length - 1
                ].url
              }
              width={500}
              height={500}
            ></Image>
          </div>
        </div>
      </div>

      <div className="w-full p-10 bg-gray-100 flex justify-center items-center">
        <FeatureCard
          features={productDetails?.data?.features}
          technicalData={productDetails?.data?.TechnicalData}
        />
      </div>
    </div>
  );
};

export default Page;
