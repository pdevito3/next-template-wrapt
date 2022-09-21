import { SortingState } from "@tanstack/react-table";

export interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  filters?: string;
  sortOrder?: SortingState;
}

export type UserDto = {
  id: string;
  identifier: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: string[];
};

export interface UserForManipulationDto {
  identifier: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  roles: string[];
}

export interface UserForCreationDto extends UserForManipulationDto {}
export interface UserForUpdateDto extends UserForManipulationDto {}

// need a string enum list?
// const StatusList = ['Status1', 'Status2', null] as const;
// export type Status = typeof StatusList[number];
// Then use as --> status: Status;
