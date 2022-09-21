import { SortingState } from "@tanstack/react-table";

// TODO: add tests
export const generateSieveSortOrder = (sortOrder: SortingState | undefined) => sortOrder && sortOrder.length > 0 
  ? sortOrder?.map((s) => (s.desc ? `-${s.id}` : s.id)).join(",")
  : undefined;