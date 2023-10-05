import axiosClient from "@/api/axiosClient";

export const storeClient = async (payload) => {
  const response = await axiosClient.post(`/clients`, payload);
  return response.data;
};
