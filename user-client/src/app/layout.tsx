import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/query-provider";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const font = Source_Code_Pro({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seiko",
  description: "Seiko Watches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <QueryProvider>
          <SessionProvider>{children}</SessionProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
