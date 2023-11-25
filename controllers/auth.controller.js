import axiosClient from "@/api/axiosClient";

export const checkAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  return true;
};

export const login = async ({ email, password }) => {
  const response = await axiosClient.post(`/login`, { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await axiosClient.post(`/logout`);
  return response.data;
};
