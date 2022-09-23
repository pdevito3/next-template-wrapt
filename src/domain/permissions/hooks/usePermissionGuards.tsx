import { useGetCurrentUserPermissions } from "@/domain/permissions";
import { Permission } from "@/domain/permissions/utils";

function useHasPermission(permission: Permission) {
  let { data: permissions } = useGetCurrentUserPermissions();
  permissions ??= [];
  return permissions?.includes(permission);
}

function useCanAccessSettings() {
  const canReadUsers = useHasPermission("CanReadUsers");
  const canReadRolePermissions = useHasPermission("CanReadRolePermissions");

  return canReadUsers || canReadRolePermissions;
}

export { useHasPermission, useCanAccessSettings };
