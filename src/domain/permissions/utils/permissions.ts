export type Permission = typeof permissions[number];
export const permissions = [
  // permissions marker - do not delete if you want to use craftsman
  "CanDeleteUsers",
  "CanUpdateUsers",
  "CanAddUsers",
  "CanReadUsers",
  "CanDeleteRolePermissions",
  "CanUpdateRolePermissions",
  "CanAddRolePermissions",
  "CanReadRolePermissions",
  "CanRemoveUserRoles",
  "CanAddUserRoles",
  "CanGetRoles",
  "CanGetPermissions",
] as const;
