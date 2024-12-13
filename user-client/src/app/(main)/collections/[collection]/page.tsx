"use client";

import CollectionBanner from "@/components/projectComp/main/CollectionBanner";
import ProductCard from "@/components/projectComp/main/ProductCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { getSingleCollectionApi } from "@/lib/queryUtils";
import { IProductDetailsCard } from "@/lib/types";

const Page = () => {
  const { collection } = useParams();
  const [currentCollection, setCurrentCollection] = useState(collection);
  const queryClient = useQueryClient();
  const collectionData = queryClient.getQueryData(["collections"]);
  // console.log(collectionData?.data.find((c) => c.name === currentCollection));
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", { collection: currentCollection }],
    queryFn: () => getSingleCollectionApi(currentCollection as string),
    enabled: !!currentCollection, // Ensures query runs only if collection is defined
  });
  const currentCollectionData = collectionData.data.find(
    (data) => data.name === currentCollection
  );
  return (
    <div className="text-black bg-gray-200 w-full h-full">
      <CollectionBanner
        title={collection as string}
        image={currentCollectionData.image}
      />

      <div>
        <h1 className="text-4xl font-bold uppercase p-8">{collection}</h1>

        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 bg-gray-200 lg:grid-cols-3 grid-cols-2 gap-4 p-4">
            {products.data?.map((product: IProductDetailsCard) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
