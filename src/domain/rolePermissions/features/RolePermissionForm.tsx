import { Button, ComboBox } from "@/components/forms";
import { Notifications } from "@/components/notifications";
import { useGetPermissions } from "@/domain/permissions";
import {
  RolePermissionForCreationDto,
  RolePermissionForUpdateDto,
  rolePermissionValidationSchema,
  useAddRolePermission,
} from "@/domain/rolePermissions";
import { useGetRoles } from "@/domain/roles";
import { FormMode } from "@/types";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface RolePermissionFormProps {
  rolePermissionId?: string | undefined;
  direction?: "horizontal" | "vertical";
}

function RolePermissionForm({
  rolePermissionId,
  direction = "vertical",
}: RolePermissionFormProps) {
  const formMode = (
    rolePermissionId ? "Edit" : "Add"
  ) as typeof FormMode[number];

  const focusField = "role";
  const { handleSubmit, reset, control, setFocus } = useForm<
    RolePermissionForCreationDto | RolePermissionForUpdateDto
  >({
    mode: "onBlur",
    resolver: yupResolver(rolePermissionValidationSchema),
    defaultValues: {
      role: "",
      permission: "",
    },
  });

  useEffect(() => {
    setFocus(focusField);
  }, [setFocus]);

  const onSubmit: SubmitHandler<
    RolePermissionForCreationDto | RolePermissionForUpdateDto
  > = (data) => {
    createRolePermission(data);
    setFocus(focusField);
  };

  const createRolePermissionApi = useAddRolePermission();
  function createRolePermission(data: RolePermissionForCreationDto) {
    createRolePermissionApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("RolePermission created successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        Notifications.error("There was an error creating the rolePermission");
        console.error(e);
      });
  }

  const { data: rolesList } = useGetRoles();
  function getRolesList() {
    return rolesList?.map((role) => ({ value: role, label: role })) ?? [];
  }
  const { data: permissionsList } = useGetPermissions();
  function getPermissionsList() {
    return (
      permissionsList?.map((permission) => ({
        value: permission,
        label: permission,
      })) ?? []
    );
  }

  return (
    <>
      {/* Need `noValidate` to allow RHF validation to trump browser validation when field is required */}
      <form
        className={clsx(
          "space-y-4",
          direction === "horizontal" && "flex items-end space-x-4"
        )}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <ComboBox
                {...field}
                label={"Role"}
                placeholder="Role..."
                testSelector="role"
                data={getRolesList() ?? []}
                clearable
                required={true}
                searchable
                disabled={getRolesList()?.length <= 0}
                error={fieldState.error?.message}
                errorSrOnly={direction === "horizontal"}
              />
            )}
          />
        </div>
        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="permission"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <ComboBox
                {...field}
                label={"Permission"}
                placeholder="Permission..."
                testSelector="permission"
                data={getPermissionsList() ?? []}
                clearable
                required={true}
                searchable
                disabled={getPermissionsList()?.length <= 0}
                error={fieldState.error?.message}
                errorSrOnly={direction === "horizontal"}
              />
            )}
          />
        </div>

        {formMode === "Add" && (
          <Button
            buttonStyle="primary"
            type="submit"
            className="w-full sm:w-auto"
          >
            Submit
          </Button>
        )}
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { RolePermissionForm };
