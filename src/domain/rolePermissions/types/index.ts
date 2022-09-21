import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export interface RolePermissionDto {
  id: string;
  role: string;
  permission: string;
}

export interface RolePermissionForManipulationDto {
  role: string;
  permission: string;
}

export interface RolePermissionForCreationDto extends RolePermissionForManipulationDto { }
export interface RolePermissionForUpdateDto extends RolePermissionForManipulationDto { }

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
