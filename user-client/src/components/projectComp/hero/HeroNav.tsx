"use client";

import { logoutUser } from "@/lib/queryUtils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HeroNav = () => {
  const session = useSession();
  const signedOutUser = async () => {
    await signOut();
    await logoutUser();
    window.location.href = "/";
  };
  return (
    <div className="p-4 px-20 text-white flex justify-between items-center">
      <div className="text-4xl text-white">
        <h1 className="font-bold">JustWatches</h1>
      </div>
      <div className="flex uppercase text-xl items-center text-white gap-20">
        {/* <div className="text-white text-sm flex items-center gap-16">
          <Link href={"/"} className="hover:text-heroOrange">
            Home
          </Link>
          <Link href={"/"} className="hover:text-heroOrange">
            About
          </Link>
          <Link href={"/"} className="hover:text-heroOrange">
            Contact
          </Link>
        </div> */}

        {session?.status == "authenticated" ? (
          <div onClick={() => signedOutUser()}>
            <button className="py-2 px-4 border-error border-2  text-sm hover:bg-error hover:scale-110 duration-300 hover:border-error uppercase hover:text-white">
              Logout &#x2192;
            </button>
          </div>
        ) : session.status == "loading" ? (
          <button className="py-2 px-4 border-white border-2  text-sm hover:translate-x-3 hover:scale-x-110 duration-300 hover:border-heroOrange uppercase hover:text-heroOrange">
            <div className="loading loading-spinner"></div>
          </button>
        ) : (
          <Link href={"/api/auth/signin"}>
            <button className="py-2 px-4 border-white border-2  text-sm hover:translate-x-3 hover:scale-x-110 duration-300 hover:border-heroOrange uppercase hover:text-heroOrange">
              Login &#x2192;
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroNav;
