import {
  QueryParams,
  RolePermissionDto,
  RolePermissionKeys,
} from "@/domain/rolePermissions";
import { clients } from "@/lib/axios";
import { PagedResponse, Pagination } from "@/types/apis";
import { generateSieveSortOrder } from "@/utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface rolepermissionListApiProps extends delayProps {
  queryString: string;
}
const getRolePermissions = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: rolepermissionListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients.recipeManagement().then((axios) =>
      axios
        .get(`/rolepermissions${queryString}`)
        .then((response: AxiosResponse<RolePermissionDto[]>) => {
          return {
            data: response.data as RolePermissionDto[],
            pagination: JSON.parse(
              response.headers["x-pagination"] ?? ""
            ) as Pagination,
          } as PagedResponse<RolePermissionDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface rolepermissionListHookProps extends QueryParams, delayProps {}
export const useRolePermissions = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: rolepermissionListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });

  return useQuery(RolePermissionKeys.list(queryParams ?? ""), () =>
    getRolePermissions({
      queryString: queryParams,
      hasArtificialDelay,
      delayInMs,
    })
  );
};
