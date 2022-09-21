const RolePermissionKeys = {
  all: ["RolePermissions"] as const,
  lists: () => [...RolePermissionKeys.all, "list"] as const,
  list: (queryParams: string) => 
    [...RolePermissionKeys.lists(), { queryParams }] as const,
  details: () => [...RolePermissionKeys.all, "detail"] as const,
  detail: (id: string) => [...RolePermissionKeys.details(), id] as const,
}

export { RolePermissionKeys };
