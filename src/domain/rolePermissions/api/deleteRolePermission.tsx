import { RolePermissionKeys } from "@/domain/rolePermissions";
import { clients } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

async function deleteRolePermission(id: string) {
  const axios = await clients.recipeManagement();
  return axios.delete(`/rolepermissions/${id}`).then(() => {});
}

export function useDeleteRolePermission(
  options?: UseMutationOptions<void, AxiosError, string>
) {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteRolePermission(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(RolePermissionKeys.lists());
      queryClient.invalidateQueries(RolePermissionKeys.details());
    },
    ...options,
  });
}
