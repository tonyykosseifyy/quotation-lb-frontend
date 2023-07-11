import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.SERVER_APP_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer 5|k2M8jfx85jNnw50ZUh0Eo0vq6AyOkKLAco3jhSea`;
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
      localStorage.removeItem("accessToken");
    }

    throw error;
  }
);

export default axiosClient;
