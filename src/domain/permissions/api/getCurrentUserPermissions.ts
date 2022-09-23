import { clients } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { PermissionKeys } from "./permission.keys";

export const getCurrentUserPermissions = async () => {
  const axios = await clients.recipeManagement();

  return axios
    .get(`/permissions/mine`)
    .then((response: AxiosResponse<string[]>) => response.data);
};

export const useGetCurrentUserPermissions = () => {
  return useQuery(PermissionKeys.all, () => getCurrentUserPermissions(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
