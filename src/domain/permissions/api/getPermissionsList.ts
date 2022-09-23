import { clients } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { PermissionKeys } from "./permission.keys";

export const getPermissions = async () => {
  const axios = await clients.recipeManagement();

  return axios
    .get(`/permissions`)
    .then((response: AxiosResponse<string[]>) => response.data);
};

export const useGetPermissions = () => {
  return useQuery(PermissionKeys.all, () => getPermissions(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
