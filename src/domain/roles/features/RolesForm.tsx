import { Button, ComboBox } from "@/components/forms";
import { useAddUserRole } from "@/domain/users/api/addUserRole";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetRoles } from "../api/getRoles";

interface RolesFormProps {
  userId: string;
  assignedRoles?: string[];
  shouldSetFocus?: boolean;
}

interface RoleToSubmit {
  role: string;
}

function RolesForm({
  userId,
  assignedRoles,
  shouldSetFocus = false,
}: RolesFormProps) {
  const focusField = "role";
  const { handleSubmit, reset, control, setFocus } = useForm<RoleToSubmit>({
    defaultValues: {
      role: "",
    },
  });

  useEffect(() => {
    shouldSetFocus && setFocus(focusField);
  }, [setFocus, shouldSetFocus]);

  const onSubmit: SubmitHandler<RoleToSubmit> = (data) => {
    addRole(data.role);
    if (shouldSetFocus) setFocus(focusField);
  };

  const { data: rolesList } = useGetRoles();
  const addRoleApi = useAddUserRole();
  function addRole(role: string) {
    addRoleApi
      .mutateAsync({ userId, role })
      .then(() => {
        toast.success("Role added successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        toast.error("There was an error adding the role");
        console.error(e);
      });
  }

  function getRolesList() {
    return (
      rolesList
        ?.filter((item) => !assignedRoles?.includes(item))
        ?.map((role) => ({ value: role, label: role })) ?? []
    );
  }

  return (
    <>
      {/* Need `noValidate` to allow RHF validation to trump browser validation when field is required */}
      <form
        className="flex items-end justify-start space-x-3"
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
              />
            )}
          />
        </div>
        <Button type="submit" disabled={getRolesList()?.length <= 0}>
          Assign Role
        </Button>
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { RolesForm };
