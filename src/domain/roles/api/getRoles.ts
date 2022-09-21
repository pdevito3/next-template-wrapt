import { clients } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { RoleKeys } from "./role.keys";

export const getRoles = async () => {
  const axios = await clients.recipeManagement();

  return axios
    .get(`/roles`)
    .then((response: AxiosResponse<string[]>) => response.data);
};

export const useGetRoles = () => {
  return useQuery(RoleKeys.all, () => getRoles(), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
