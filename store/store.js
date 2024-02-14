import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) =>
        set({
          user,
        }),
      setToken: (token) =>
        set({
          token,
        }),
    }),
    {
      name: "auth",
    },
  ),
);

export default useAuthStore;
