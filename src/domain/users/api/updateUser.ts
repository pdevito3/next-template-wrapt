import { clients } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserForUpdateDto } from "../types";
import { UserKeys } from "./user.keys";

export const updateUser = async (id: string, data: UserForUpdateDto) => {
  const axios = await clients.recipeManagement();
  return axios.put(`/users/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: UserForUpdateDto;
}

export function useUpdateUser(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedUser }: UpdateProps) => updateUser(id, updatedUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(UserKeys.lists());
        queryClient.invalidateQueries(UserKeys.details());
      },
      ...options,
    }
  );
}
