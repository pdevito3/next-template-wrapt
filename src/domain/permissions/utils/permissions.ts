export type Permission = typeof permissions[number];
export const permissions = [
  "CanDeleteRecipes",
  "CanUpdateRecipes",
  "CanAddRecipes",
  "CanReadRecipes",
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
