import { UserType } from "@/lib/types";
import { create } from "zustand";

const initialUser: UserType = {
  id: "",
  name: "",
  email: "",
  image: "",
  authProvider: "",
  authProviderId: "",
  isAdmin: false,
  createdAt: "",
  updatedAt: "",
};
export const useUserStore = create((set) => ({
  user: initialUser,
  setUser: (user: UserType) => set({ user }),
  removeUser: () => set({ user: initialUser }),
}));
