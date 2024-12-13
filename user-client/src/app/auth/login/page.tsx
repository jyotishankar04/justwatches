"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
const page = () => {
  return (
    <div className="w-full h-screen grid grid-cols-2">
      <div className="w-full h-full bg-heroOrange flex justify-center items-center">
        <h1 className="text-4xl flex flex-col gap-6 text-white w-full text-center">
          Welcome to
          <br />
          <span className="text-6xl font-bold ">justWatchess</span>
        </h1>
      </div>
      <div className="w-full h-full flex justify-center bg-gray-200 items-center">
        <div className="p-4 bg-white  flex flex-col gap-4 items-center rounded-sm">
          <h1 className="text-xl font-bold">Login</h1>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => signIn("google")}
              className="py-2 px-4 border-2 hover:bg-white hover:text-black border-black flex flex-row items-center gap-4 rounded-sm bg-black text-white duration-300"
            >
              Continue with Google <FaGoogle />
            </button>
            <button
              onClick={() => signIn("github")}
              className="py-2 px-4 border-2 hover:bg-white hover:text-black border-black flex flex-row items-center gap-4 rounded-sm bg-black text-white duration-300"
            >
              Continue with Github <FaGithub />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
