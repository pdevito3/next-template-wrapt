import { Button, TextInput } from "@/components/forms";
import { Notifications } from "@/components/notifications";
import {
  useAddUser,
  UserDto,
  UserForCreationDto,
  UserForUpdateDto,
  userValidationSchema,
  useUpdateUser,
} from "@/domain/users";
import { FormMode } from "@/types";
import { useAutosave } from "@/utils";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface UserFormProps {
  userId?: string | undefined;
  userData?: UserDto;
}

function UserForm({ userId, userData }: UserFormProps) {
  let formMode = (userId ? "Edit" : "Add") as typeof FormMode[number];

  const focusField = "identifier";
  const {
    handleSubmit,
    reset,
    control,
    setFocus,
    setValue,
    watch,
    formState: { dirtyFields, isValid },
  } = useForm<UserForCreationDto | UserForUpdateDto>({
    mode: "onBlur",
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      identifier: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
    },
  });
  const simpleIsDirty = !!Object.keys(dirtyFields).length;

  useEffect(() => {
    setFocus(focusField);
  }, [setFocus]);

  const onSubmit: SubmitHandler<UserForCreationDto | UserForUpdateDto> = (
    data
  ) => {
    formMode === "Add" ? createUser(data) : updateUser(data);
    if (formMode === "Add") setFocus(focusField);
  };

  const router = useRouter();

  const createUserApi = useAddUser();
  function createUser(data: UserForCreationDto) {
    createUserApi
      .mutateAsync(data)
      .then((data) => {
        formMode = "Edit";
        userData = data;
        router.push(`/settings/users/${data.id}`);
      })
      .then(() => {
        Notifications.success("User created successfully");
      })
      .catch((e) => {
        Notifications.error("There was an error creating the user");
        console.error(e);
      });
  }

  const updateUserApi = useUpdateUser();
  function updateUser(data: UserForUpdateDto) {
    const id = userId;
    if (id === null || id === undefined) return;

    updateUserApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("User updated successfully");
      })
      .then(() => {
        reset(
          { ...data },
          {
            keepValues: true,
          }
        );
      })
      .catch((e) => {
        Notifications.error("There was an error updating the user");
        console.error(e);
      });
  }

  useEffect(() => {
    if (formMode === "Edit") {
      setValue("identifier", userData?.identifier ?? "");
      setValue("firstName", userData?.firstName ?? "");
      setValue("lastName", userData?.lastName ?? "");
      setValue("email", userData?.email ?? "");
      setValue("username", userData?.username ?? "");
      reset(
        {},
        {
          keepValues: true,
        }
      );
    }
  }, [formMode, userData, reset, setValue]);

  const watchAllFields = watch();
  useAutosave({
    handleSubmission: handleSubmit(onSubmit),
    isDirty: simpleIsDirty,
    isValid,
    formFields: watchAllFields,
    isActive: formMode === "Edit",
  });

  return (
    <div>
      {/* Need `noValidate` to allow RHF validation to trump browser validation when field is required */}
      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="col-span-1 sm:col-span-3">
          <Controller
            name="identifier"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Identifier"}
                placeholder="Identifier..."
                testSelector="identifier"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.identifier?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"First Name"}
                placeholder="First Name..."
                testSelector="firstName"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.firstName?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Last Name"}
                placeholder="Last Name..."
                testSelector="lastName"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.lastName?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Email"}
                placeholder="Email..."
                testSelector="email"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.email?.exclusiveTests?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Username"}
                placeholder="Username..."
                testSelector="username"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.username?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        {formMode === "Add" && (
          <Button buttonStyle="primary" type="submit">
            Submit
          </Button>
        )}
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </div>
  );
}

export { UserForm };
