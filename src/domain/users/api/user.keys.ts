const UserKeys = {
  all: ["Users"] as const,
  lists: () => [...UserKeys.all, "list"] as const,
  list: (queryParams: string) =>
    [...UserKeys.lists(), { queryParams }] as const,
  details: () => [...UserKeys.all, "detail"] as const,
  detail: (id: string) => [...UserKeys.details(), id] as const,
};

export { UserKeys };
