import { clients } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { RolePermissionForUpdateDto, RolePermissionKeys } from "@/domain/rolePermissions";

const updateRolePermission = async (id: string, data: RolePermissionForUpdateDto) => {
  const axios = await clients.recipeManagement();
  return axios.put(`/rolepermissions/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: RolePermissionForUpdateDto;
}

export function useUpdateRolePermission(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedRolePermission }: UpdateProps) =>
      updateRolePermission(id, updatedRolePermission),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(RolePermissionKeys.lists());
        queryClient.invalidateQueries(RolePermissionKeys.details());
      },
      ...options,
    }
  );
}
