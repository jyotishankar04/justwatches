"use client";

import React from "react";
import ProductsTable from "./components/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <Card className="w-full h-full rounded-sm">
        <CardHeader className="flex justify-between flex-row items-center">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products</CardDescription>
          </div>
          <div className="flex gap-2">
            <Link href={"/dashboard/products/add"}>
              <Button variant="default">Add Product</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <ProductsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
