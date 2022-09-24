import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { useHasPermission } from "@/domain/permissions";
import { UserForm } from "@/domain/users";
import Head from "next/head";

export default function NewUser() {
  const canAddUser = useHasPermission("CanAddUsers");

  return (
    <>
      <Head>
        <title>Add User</title>
      </Head>

      <PrivateLayout>
        {canAddUser ? (
          <div className="space-y-6">
            <div className="pt-4">
              <Button buttonStyle="secondary" href={"/settings"}>
                Back
              </Button>
            </div>
            <div className="">
              <h1 className="h1">Add a User</h1>
              <div className="max-w-3xl py-6 space-y-5">
                <UserForm />
              </div>
            </div>
          </div>
        ) : (
          <p>Forbidden</p>
        )}
      </PrivateLayout>
    </>
  );
}
