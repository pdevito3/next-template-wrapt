import { clients } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { RolePermissionDto, RolePermissionForCreationDto, RolePermissionKeys } from "@/domain/rolePermissions";

const addRolePermission = async (data: RolePermissionForCreationDto) => {
  const axios = await clients.recipeManagement();

  return axios
    .post("/rolepermissions", data)
    .then((response) => response.data as RolePermissionDto);
};

export function useAddRolePermission(
  options?: UseMutationOptions<RolePermissionDto, AxiosError, RolePermissionForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation(
    (newRolePermission: RolePermissionForCreationDto) => addRolePermission(newRolePermission),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(RolePermissionKeys.lists());
      },
      ...options,
    }
  );
}
