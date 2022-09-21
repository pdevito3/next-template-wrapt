import { clients } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { UserDto, UserForCreationDto } from "../types";
import { UserKeys } from "./user.keys";

const addUser = async (data: UserForCreationDto) => {
  const axios = await clients.recipeManagement();

  return axios
    .post("/users", data)
    .then((response) => response.data as UserDto);
};

export function useAddUser(
  options?: UseMutationOptions<UserDto, AxiosError, UserForCreationDto>
) {
  const queryClient = useQueryClient();

  return useMutation((newUser: UserForCreationDto) => addUser(newUser), {
    onSuccess: () => {
      queryClient.invalidateQueries(UserKeys.lists());
    },
    ...options,
  });
}
