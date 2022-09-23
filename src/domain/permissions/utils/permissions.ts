export type Permission = typeof permissions[number];
export const permissions = [
  "CanDeleteRecipe",
  "CanUpdateRecipe",
  "CanAddRecipe",
  "CanReadRecipes",
  "CanDeleteUser",
  "CanUpdateUser",
  "CanAddUser",
  "CanReadUsers",
  "CanDeleteRolePermission",
  "CanUpdateRolePermission",
  "CanAddRolePermission",
  "CanReadRolePermissions",
  "CanRemoveUserRole",
  "CanAddUserRole",
  "CanGetRoles",
  "CanGetPermissions",
] as const;
