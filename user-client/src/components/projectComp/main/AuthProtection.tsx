"use client";

import Loading from "@/components/Loading";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserApi } from "@/lib/queryUtils";
import { useEffect } from "react";

const AuthProtection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const { setUser } = useUserStore((state) => state);
  const session = useSession();
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      refetch(); // Fetch user data when authenticated
    }
  }, [session.status, refetch]);

  if (session.status === "loading" || isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (user.success === false) {
    return (
      <div className="w-full h-full flex gap-4 justify-center flex-col iteams-center text-xl ">
        <h1 className="text-3xl font-bold w-full text-center">Unauthorized</h1>
        <p className="w-full text-center">
          You need to be logged in to view this page
        </p>
        <div className="flex flex-row gap-4 justify-center w-full text-center">
          <Link
            href="/auth/login"
            className="py-2 px-4 border-2 hover:bg-white hover:text-black border-black flex flex-row items-center gap-4 rounded-sm bg-black text-white duration-300"
          >
            <button>Login</button>
          </Link>
          <Link
            href="/"
            className="py-2 px-4 border-2 hover:bg-white hover:text-black border-black flex flex-row items-center gap-4 rounded-sm bg-black text-white duration-300"
          >
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    );
  }

  if (session.status === "authenticated" && user.success) {
    return <>{children}</>;
  }

  return <div>Error</div>;
};

export default AuthProtection;
