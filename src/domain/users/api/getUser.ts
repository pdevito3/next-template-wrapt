import { clients } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { UserDto } from "../types";
import { UserKeys } from "./user.keys";

export const getUser = async (id: string) => {
  const axios = await clients.recipeManagement();

  return axios
    .get(`/users/${id}`)
    .then((response: AxiosResponse<UserDto>) => response.data);
};

export const useGetUser = (id: string | null | undefined) => {
  return useQuery(UserKeys.detail(id!), () => getUser(id!), {
    enabled: id !== null && id !== undefined,
  });
};
