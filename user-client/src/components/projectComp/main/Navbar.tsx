"use client";

import Link from "next/link";
import React from "react";
import NavProfile from "./NavProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCollectionApi } from "@/lib/queryUtils";
interface PropTypes {
  children?: React.ReactNode;
  title: string;
  href: string;
  className?: string;
}

const Navbar = () => {
  const { data: collections, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollectionApi,
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex sticky top-0 z-50 justify-between items-center text-white bg-black p-3 ">
      <div>
        <div className="dropdown dropdown-bottom dropdown-right">
          <div tabIndex={0} role="button" className="uppercase px-4">
            Collections &#x2192;
          </div>
          <div
            tabIndex={0}
            className="dropdown-content flex flex-col rounded-md gap-2 bg-white card card-compact text-black z-[1] w-96 p-2 shadow"
          >
            <div>
              <Link href={"/collections"} className="group">
                <h1 className="text-3xl font-semibold uppercase  hover:text-heroOrange">
                  Collections
                  <span className="ml-2 text-3xl font-normal hover:translate-x-5">
                    &#x2192;
                  </span>
                </h1>
              </Link>
            </div>
            <div
              className={`grid ${
                collections.data && "grid-cols-2"
              } grid-cols-1 gap-2 uppercase`}
            >
              {collections.data ? (
                collections?.data.map((collection) => (
                  <CollectionButtons
                    key={collection.id}
                    href={`/collections/${collection.name}`}
                    title={collection.name}
                  />
                ))
              ) : (
                <div className="flex flex-col justify-center w-full items-center p-2">
                  <h1 className="text-xl text-red-600 font-semibold">
                    You are not signed in
                  </h1>
                  <Link
                    href={"/auth/login"}
                    className="btn rounded-sm text-white bg-black"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-semibold uppercase ">JustWatches</h1>
      <div className="z-50">
        <NavProfile />
      </div>
    </div>
  );
};

const CollectionButtons = ({ href, title, className, children }: PropTypes) => {
  return (
    <Link
      href={href}
      className={`p-2 hover:text-white hover:bg-black rounded-md` + className}
    >
      {children || title}
    </Link>
  );
};

export default Navbar;
