"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStockApi, updateStockApi } from "@/utils/QueryUtils";
import { getFormattedDate } from "@/utils/TimeConverter";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Stock {
  id: string;
  Products: { name: string };
  quantity: number;
  updatedAt: string;
  createdAt: string;
}

const StocksTable: React.FC = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("date"); // State for sorting order
  const { register, handleSubmit, setValue } = useForm<{
    id: string;
    quantity: number;
  }>();

  const {
    data: stocks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stocks", orderBy], // Add orderBy to the query key to refetch on change
    queryFn: () => getStockApi(orderBy), // Pass orderBy directly to the query function
    initialData: { data: [], success: true },
  });

  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: (data: { id: string; data: { quantity: number } }) =>
      updateStockApi(data.id, data.data),
    onSuccess: () => {
      refetch();
      setEditOpen(false);
    },
  });

  const handleUpdate = handleSubmit((data) => {
    if (data.quantity < 0) {
      alert("Quantity cannot be negative");
      return;
    }
    mutate({
      id: data.id,
      data: { quantity: data.quantity },
    });
  });

  return (
    <Table>
      <TableCaption>List of Stocks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>
            <Select
              defaultValue="date"
              onValueChange={(value) => {
                setOrderBy(value); // Set orderBy value
                refetch(); // Refetch data with the new sorting order
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="SORT BY" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quantity">Quantity</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : (
          Array.isArray(stocks.data) &&
          stocks.data.map((stock: Stock, index: number) => (
            <TableRow
              className={`${
                stock.quantity <= 0
                  ? "bg-red-400 hover:bg-red-500"
                  : stock.quantity < 5
                  ? "bg-red-200 hover:bg-red-300"
                  : stock.quantity < 10
                  ? "bg-yellow-200 hover:bg-yellow-300"
                  : "bg-green-200 hover:bg-green-300"
              }`}
              key={stock.id}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{stock.Products.name}</TableCell>
              <TableCell>{stock.quantity}</TableCell>
              <TableCell>{getFormattedDate(stock.updatedAt)}</TableCell>
              <TableCell>{getFormattedDate(stock.createdAt)}</TableCell>
              <TableCell>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setValue("id", stock.id);
                        setValue("quantity", stock.quantity);
                      }}
                    >
                      Update Stock
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Update Stock</DialogTitle>
                      <DialogDescription>
                        Update the stock of the product
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleUpdate}>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          disabled={isUpdating}
                          type="number"
                          {...register("quantity", { valueAsNumber: true })}
                        />
                      </div>
                      {isUpdating ? (
                        <Button disabled type="submit" className="mt-2 w-full">
                          <Loader2 className="animate-spin w-4 h-4" />
                          Updating...
                        </Button>
                      ) : (
                        <Button type="submit" className="mt-2 w-full">
                          Update
                        </Button>
                      )}
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default StocksTable;
