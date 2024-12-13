import AuthProtection from "@/components/projectComp/main/AuthProtection";
import Navbar from "@/components/projectComp/main/Navbar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex bg-gray-200 h-screen  flex-col items-center justify-start">
      <div className="w-full">
        <Navbar />
      </div>
      <AuthProtection>{children}</AuthProtection>
    </div>
  );
}
