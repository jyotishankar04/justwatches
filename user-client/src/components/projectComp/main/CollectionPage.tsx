"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import CollectionCard from "./CollectionCard";
import { getCollectionApi } from "@/lib/queryUtils";

const CollectionPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionApi,
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      {data
        ? data.data.map(
            (collection: {
              id: string;
              name: string;
              image: string;
              description: string;
            }) => {
              return (
                <CollectionCard
                  key={collection.id}
                  title={collection.name}
                  href={collection.name}
                  img={collection.image}
                  description={collection.description}
                />
              );
            }
          )
        : "You are not authenticated. Please sign in."}
    </>
  );
};

export default CollectionPage;
