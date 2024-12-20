"use client";

import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFormattedDate } from "@/utils/TimeConverter";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Eye, Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProductApi, fetchProducts } from "@/utils/QueryUtils";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProduct } from "@/utils/type";

// interface Product {
//   name: string;
//   Collection: {
//     name: string;
//   };
//   price: number;
//   stock: number;
//   createdAt: string;
//   id: string;
// }

const ProductsTable = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("newest");

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", { orderBy: orderBy }],
    queryFn: () => fetchProducts({ orderBy }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    enabled: true,
  });

  const { mutate: deleteProduct, isLoading: isDeletingProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Success",
        description: "Product deleted successfully",
        duration: 3000,
      });
      refetch();
      setDeleteDialogOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
        duration: 3000,
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (products && products.data.length == 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }
  return (
    <Table>
      <TableCaption>List of products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="w-40">
            <Select
              defaultValue="newest"
              value={orderBy}
              onValueChange={(value) => {
                setOrderBy(value);
                refetch();
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="SORT BY" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="lowest_price">Price (Low - High)</SelectItem>
                <SelectItem value="highest_price">
                  Price (High - Low)
                </SelectItem>
                <SelectItem value="atoz">Name (A - Z)</SelectItem>
                <SelectItem value="ztoa">Name (Z - A)</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="popularity">Most Ordered</SelectItem>
              </SelectContent>
            </Select>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products &&
          products.data.map((product: IProduct) => (
            <TableRow key={product.name || ""}>
              <TableCell>{product.name || ""}</TableCell>
              <TableCell>{product.Collection.name || ""}</TableCell>

              <TableCell>{product.price || ""}</TableCell>
              <TableCell>
                <span className="text-green-600">Avilable</span>
              </TableCell>
              <TableCell>
                {getFormattedDate(product.createdAt as string) || ""}
              </TableCell>
              <TableCell className="flex justify-center items-center w-full h-full">
                <div className="flex gap-2">
                  <Link href={`/dashboard/products/${product.id}`}>
                    <Eye className="h-4 w-4 text-green-600" />
                  </Link>
                  <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Trash className="h-4 w-4 text-rose-700 cursor-pointer" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader className="flex flex-col gap-5">
                        <DialogTitle className="font-normal ">
                          Are you sure you want to delete this product?
                        </DialogTitle>
                        <DialogDescription className="w-full flex flex-row gap-5">
                          <Button
                            variant={"secondary"}
                            disabled={isDeletingProduct}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            disabled={isDeletingProduct}
                            onClick={() => {
                              deleteProduct(product.id);
                            }}
                          >
                            {isDeletingProduct ? (
                              <span className="flex items-center">
                                <Loader2 className="animate-spin" />
                                <span className="ml-2">Deleting...</span>
                              </span>
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Link href={"/dashboard/products/edit/" + product.id}>
                    <Edit2 className="h-4 w-4 text-black" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
