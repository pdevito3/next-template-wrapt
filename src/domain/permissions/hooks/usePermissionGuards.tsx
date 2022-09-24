import { useGetCurrentUserPermissions } from "@/domain/permissions";
import { Permission } from "@/domain/permissions/utils";

function useHasPermission(permission: Permission) {
  let { data: permissions, isLoading } = useGetCurrentUserPermissions();
  permissions ??= [];
  return { hasPermission: permissions?.includes(permission), isLoading };
}

function useCanAccessSettings() {
  const canReadUsers = useHasPermission("CanReadUsers");
  const canReadRolePermissions = useHasPermission("CanReadRolePermissions");

  return {
    hasPermission:
      canReadUsers.hasPermission || canReadRolePermissions.hasPermission,
    isLoading: canReadUsers.isLoading || canReadRolePermissions.isLoading,
  };
}

export { useHasPermission, useCanAccessSettings };
