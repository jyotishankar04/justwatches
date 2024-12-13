import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";

const page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-5">
      <BiErrorCircle className="w-52 h-52 text-red-700 font-normal" />
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <Link
        href={"/cart"}
        className="bg-black text-white py-4 text-xl  px-10 hover:text-white hover:bg-heroOrange"
      >
        Go to cart and try again
      </Link>
    </div>
  );
};

export default page;
