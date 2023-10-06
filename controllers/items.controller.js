const { default: axiosClient } = require("@/api/axiosClient");

export const storeItem = async (payload) => {
  const response = await axiosClient.post(`/items`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
