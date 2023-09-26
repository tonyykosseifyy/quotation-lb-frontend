import axiosClient from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

export const useClients = (page, perPage, debouncedSearch) =>
  useQuery({
    queryKey: ["clients", page, perPage, debouncedSearch],
    queryFn: () =>
      axiosClient.get(`clients`, {
        params: {
          page: page,
          perPage: perPage,
          search: debouncedSearch,
        },
      }),
    keepPreviousData: true,
  });
