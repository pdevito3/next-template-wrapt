import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { Forbidden } from "@/domain/auth";
import { useHasPermission } from "@/domain/permissions";
import { AssignedRolesList, RolesForm } from "@/domain/roles";
import { useGetUser, UserForm } from "@/domain/users";
import Head from "next/head";
import { useRouter } from "next/router";

export default function EditUser() {
  const router = useRouter();
  const { userId } = router.query;
  const { data: userData } = useGetUser(userId?.toString() ?? "");
  const canUpdateUser = useHasPermission("CanUpdateUsers");
  const canAddUserRole = useHasPermission("CanAddUserRoles");

  return (
    <>
      <Head>
        <title>Edit User</title>
      </Head>

      <PrivateLayout>
        {canUpdateUser ? (
          <div className="space-y-6">
            <div className="pt-4">
              <Button buttonStyle="secondary" href={"/settings"}>
                Back
              </Button>
            </div>
            <div className="">
              <h1 className="h1">Edit User</h1>
              <div className="max-w-3xl py-6 space-y-5">
                <UserForm userId={userId?.toString()} userData={userData} />

                <div className="pt-5 space-y-3 lg:pt-0">
                  <h2 className="h2">Manage Roles</h2>
                  {canAddUserRole && (
                    <RolesForm
                      userId={userId?.toString() ?? ""}
                      assignedRoles={userData?.roles}
                    />
                  )}

                  <h3 className="h3">Assigned Roles</h3>
                  <AssignedRolesList
                    userId={userId?.toString() ?? ""}
                    assignedRoles={userData?.roles}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Forbidden />
        )}
      </PrivateLayout>
    </>
  );
}
