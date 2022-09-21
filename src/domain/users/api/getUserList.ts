import { clients } from "@/lib/axios";
import { PagedResponse, Pagination } from "@/types/apis";
import { generateSieveSortOrder } from "@/utils/sorting";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import { useQuery } from "react-query";
import { QueryParams, UserDto } from "../types";
import { UserKeys } from "./user.keys";

interface delayProps {
  hasArtificialDelay?: boolean;
  delayInMs?: number;
}

interface userListApiProps extends delayProps {
  queryString: string;
}
const getUsers = async ({
  queryString,
  hasArtificialDelay,
  delayInMs,
}: userListApiProps) => {
  queryString = queryString == "" ? queryString : `?${queryString}`;

  delayInMs = hasArtificialDelay ? delayInMs : 0;

  const [json] = await Promise.all([
    clients.recipeManagement().then((axios) =>
      axios
        .get(`/users${queryString}`)
        .then((response: AxiosResponse<UserDto[]>) => {
          return {
            data: response.data as UserDto[],
            pagination: JSON.parse(
              response.headers["x-pagination"] ?? ""
            ) as Pagination,
          } as PagedResponse<UserDto>;
        })
    ),
    new Promise((resolve) => setTimeout(resolve, delayInMs)),
  ]);
  return json;
};

interface userListHookProps extends QueryParams, delayProps {}
export const useUsers = ({
  pageNumber,
  pageSize,
  filters,
  sortOrder,
  hasArtificialDelay = false,
  delayInMs = 500,
}: userListHookProps) => {
  let sortOrderString = generateSieveSortOrder(sortOrder);
  let queryParams = queryString.stringify({
    pageNumber,
    pageSize,
    filters,
    sortOrder: sortOrderString,
  });
  // var temp = useSession();
  // console.log(temp.data.accessToken);

  return useQuery(UserKeys.list(queryParams ?? ""), () =>
    getUsers({ queryString: queryParams, hasArtificialDelay, delayInMs })
  );
};
