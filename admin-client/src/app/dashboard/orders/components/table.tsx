"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { getAllOrders, updateOrderStatusApi } from "@/utils/QueryUtils";
import { getFormattedDate } from "@/utils/TimeConverter";
import { IOrder, orderSortingTypes, orderStatusEnums } from "@/utils/type";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const OrdersTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [orderBy, setOrderBy] = useState(orderSortingTypes.NEWEST);
  const [orderStatus, setOrderStatus] = useState(orderStatusEnums.ALL);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(200);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [mutateStatus, setMutateStatus] = useState<orderStatusEnums | null>(
    null
  );

  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders", orderBy, orderStatus, page, limit],
    queryFn: () =>
      getAllOrders({
        orderBy,
        status: orderStatus,
        page,
        limit,
      }),
  });

  const { mutate: updateOrderStatus, isLoading: isMutating } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      updateOrderStatusApi({ id, status: mutateStatus as orderStatusEnums }),
    onSuccess: (data) => {
      if (data.success) {
        setMutateStatus(null);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        toast.success("Order status updated successfully");
        setIsDialogOpen(false);
      } else {
        setMutateStatus(null);
        toast.error(data.message);
        setIsDialogOpen(false);
      }
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.error("Failed to update order status");
      setIsDialogOpen(false);
    },
  });

  const getStatusDetails = (data: string) => {
    switch (data) {
      case orderStatusEnums.CANCELLED:
        return <div className="text-red-500">Cancelled</div>;
      case orderStatusEnums.DELIVERED:
        return <div className="text-green-500">Delivered</div>;
      case orderStatusEnums.ORDER_PLACED:
        return <div className="text-yellow-500">Order Placed</div>;
      case orderStatusEnums.PENDING:
        return <div className="text-blue-500">Pending</div>;
      case orderStatusEnums.SHIPPED:
        return <div className="text-blue-500">Shipped</div>;
      default:
        return "All";
    }
  };

  if (isOrdersLoading) return <Loader2 className="animate-spin" />;

  return (
    <Table className="w-full">
      <TableCaption>List of Orders</TableCaption>
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="w-[40px]">#</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="w-40">
            <Select
              value={orderBy} // Bind the value to the state
              onValueChange={(value) => {
                setOrderBy(value as orderSortingTypes);
              }}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="SORT BY" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(orderSortingTypes).map((key) => (
                  <SelectItem className="uppercase" key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={orderStatus} // Bind the value to the state
              onValueChange={(value) => {
                setOrderStatus(value as orderStatusEnums);
              }}
            >
              <SelectTrigger className="w-40 mt-2">
                <SelectValue placeholder="FILTER BY" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(orderStatusEnums)
                  .concat("ALL")
                  .map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.data &&
          orders?.data.map((order: IOrder, index: number) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{getFormattedDate(order.createdAt)}</TableCell>
              <TableCell>{order.OrderedProducts.length}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
              <TableCell>{getStatusDetails(order.status)}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>
                <Dialog
                  open={isDialogOpen}
                  onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (open) setSelectedOrder(order);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Change Status
                    </Button>
                  </DialogTrigger>
                  {selectedOrder && (
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change Order Status</DialogTitle>
                        <DialogDescription>
                          Update the status of this order
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Select
                          value={mutateStatus ?? selectedOrder.status}
                          onValueChange={(value) => {
                            setMutateStatus(value as orderStatusEnums);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select new status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(orderStatusEnums).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter>
                        {isMutating ? (
                          <Button disabled>
                            <Loader2 className="animate-spin" />
                            Please wait
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            onClick={() => {
                              updateOrderStatus({ id: selectedOrder.id });
                            }}
                          >
                            Save changes
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
