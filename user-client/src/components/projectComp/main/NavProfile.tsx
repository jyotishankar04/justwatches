"use client";

import { logoutUser } from "@/lib/queryUtils";
import { useQueryClient } from "@tanstack/react-query";
// import { useUserStore } from "@/app/store/userStore";
import { ShoppingCart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
// import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NavProfile = () => {
  const session = useSession();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const signOutUser = async () => {
    await signOut();
    await logoutUser();
    window.location.href = "/";
  };

  return (
    <div className="flex items-center z-50 justify-end gap-8 pr-10">
      {session.status === "loading" ||
      session.status === "unauthenticated" ||
      !user.success ? (
        <div>
          <Link
            href="/api/auth/signin"
            className="py-2 px-4 border-white border-2  text-sm hover:translate-x-3 hover:scale-x-110 duration-300 hover:border-heroOrange uppercase hover:text-heroOrange"
          >
            Login
          </Link>
        </div>
      ) : (
        <>
          <Link href="/cart">
            <ShoppingCart />
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="profile image"
                  src={user.data.image && user?.data.image}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div
              tabIndex={0}
              className="menu rounded-none menu-sm dropdown-content bg-white  z-[1] mt-3 w-52 p-2 shadow"
            >
              <div className=" flex flex-col gap-2">
                <Link href="/profile">
                  <h1 className="text-lg hover:bg-black hover:text-white p-2 font-semibold uppercase text-black">
                    Profile
                  </h1>
                </Link>
                <Link href="/orders">
                  <h1 className="text-lg hover:bg-black hover:text-white p-2 font-semibold uppercase text-black">
                    Orders
                  </h1>
                </Link>
                <div
                  onClick={() => {
                    signOutUser();
                  }}
                >
                  <h1 className="text-lg hover:bg-error hover:text-white p-2 font-semibold uppercase text-red-700">
                    Logout
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavProfile;
