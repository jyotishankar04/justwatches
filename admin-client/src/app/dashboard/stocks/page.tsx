"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StocksTable from "./components/table";

const Page = () => {
  return (
    <div>
      <Card className="w-full h-full rounded-sm">
        <CardHeader className="flex justify-between flex-row items-center">
          <div>
            <CardTitle>Stocks</CardTitle>
            <CardDescription>Stocks</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <StocksTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
