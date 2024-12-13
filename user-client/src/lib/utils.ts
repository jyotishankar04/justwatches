import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToastWithData = (data: any) => {
  if (data.success) {
    return toast.success(data.message);
  }

  if (!data.success) {
    return toast.error(data.message);
  }
};
