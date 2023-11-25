import useAuthStore from "@/store/store";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/api`,
});
)
console.log("base url",`${process.env.NEXT_PUBLIC_SERVER_APP_BASE_URL}/api`);

axiosClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      useAuthStore.setState(() => ({ isAuthenticated: false }));
      useAuthStore.setState(() => ({ user: false }));
      useAuthStore.setState(() => ({ setToken: false }));
    }

    throw error;
  },
);

export default axiosClient;
