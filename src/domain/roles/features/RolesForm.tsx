import { Button, ComboBox, TrashButton } from "@/components/forms";
import { useAddUserRole } from "@/domain/users/api/addUserRole";
import { useRemoveUserRole } from "@/domain/users/api/removeUserRole";
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
  const removeRoleApi = useRemoveUserRole();
  function removeRole(role: string) {
    removeRoleApi
      .mutateAsync({ userId, role })
      .then(() => {
        toast.success("Role removed successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        toast.error("There was an error removing the role");
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

        <div className="">
          <Button type="submit" disabled={getRolesList()?.length <= 0}>
            Assign Role
          </Button>
        </div>
      </form>
      <h3 className="h3">Assigned Roles</h3>
      <div className="p-2 mt-3 space-y-2 border rounded-md shadow dark:border-slate-800">
        {
          <>
            {assignedRoles && assignedRoles?.length > 0 ? (
              assignedRoles?.map((role) => (
                <div
                  className="flex items-center justify-between w-full px-4 py-2 rounded-md group hover:bg-slate-50 dark:hover:bg-slate-600"
                  key={role}
                >
                  <p className="flex-1 w-full select-none">{role}</p>

                  <div className="flex items-center justify-center">
                    <TrashButton
                      onClick={() => {
                        removeRole(role);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <>No roles assigned</>
            )}
          </>
        }
      </div>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { RolesForm };
