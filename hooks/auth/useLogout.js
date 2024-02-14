import useAuthStore from "@/store/store";
import { toast } from "react-toastify";

const { logout } = require("@/controllers/auth.controller");
const { Routes } = require("@/routes/routes");
const { useMutation } = require("@tanstack/react-query");
const { useRouter } = require("next/navigation");

export const useLogout = () => {
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation(logout, {
    onSuccess: (data) => {
      setUser(null);
      setIsAuthenticated(false);
      setToken(null);
      router.replace(Routes.Login);
      toast(data.data.message);
    },
    onError: (error) => {
      toast(error.response.data.message);
    },
  });
};
