import { clients } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserKeys } from "./user.keys";

export const removeUserRole = async (userId: string, role: string) => {
  const axios = await clients.recipeManagement();
  return axios
    .put(`/users/${userId}/removeRole`, role, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data);
};

export interface UpdateProps {
  userId: string;
  role: string;
}

export function useRemoveUserRole(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ userId, role }: UpdateProps) => removeUserRole(userId, role),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(UserKeys.details());
      },
      ...options,
    }
  );
}
