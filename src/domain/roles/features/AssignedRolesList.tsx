import { TrashButton } from "@/components/forms";
import { useHasPermission } from "@/domain/permissions";
import { useRemoveUserRole } from "@/domain/users/api/removeUserRole";
import toast from "react-hot-toast";

interface AssignedRolesListProps {
  userId: string;
  assignedRoles?: string[];
}

function AssignedRolesList({ userId, assignedRoles }: AssignedRolesListProps) {
  const canRemoveUserRole = useHasPermission("CanRemoveUserRoles");

  const removeRoleApi = useRemoveUserRole();
  function removeRole(role: string) {
    removeRoleApi
      .mutateAsync({ userId, role })
      .then(() => {
        toast.success("Role removed successfully");
      })
      .catch((e) => {
        toast.error("There was an error removing the role");
        console.error(e);
      });
  }

  return (
    <>
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
                  {canRemoveUserRole.hasPermission && (
                    <div className="flex items-center justify-center">
                      <TrashButton
                        onClick={() => {
                          removeRole(role);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <>No roles assigned</>
            )}
          </>
        }
      </div>
    </>
  );
}

export { AssignedRolesList };
