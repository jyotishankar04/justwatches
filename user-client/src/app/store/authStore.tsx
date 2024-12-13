import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false, // Initialize isAuthenticated directly in the state
  setAuthorized: () => set({ isAuthenticated: true }),
  setUnauthorized: () => set({ isAuthenticated: false }),
}));
