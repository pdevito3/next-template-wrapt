import { PrivateLayout } from "@/components";
import { Tabs } from "@/components/forms";
import { RolePermissionsTab, UsersTab } from "@/components/settings";
import { useCanAccessSettings, useHasPermission } from "@/domain/permissions";
import { IconShieldLock, IconUser } from "@tabler/icons";
import "@tanstack/react-table";
import Head from "next/head";
import { useState } from "react";

Settings.isPublic = false;
export default function Settings() {
  const [activeTab, setActiveTab] = useState<string | null>("users");
  const canAccessSettings = useCanAccessSettings();
  const canReadUsers = useHasPermission("CanReadUsers");
  const canReadRolePermissions = useHasPermission("CanReadRolePermissions");

  const tabs = [];
  if (canReadUsers)
    tabs.push({
      value: "users",
      label: "Users",
      icon: <IconUser className="w-5 h-5" />,
    });
  if (canReadRolePermissions)
    tabs.push({
      value: "rolepermissions",
      label: "Role Permissions",
      icon: <IconShieldLock className="w-5 h-5" />,
    });

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <PrivateLayout>
        {canAccessSettings ? (
          <div className="space-y-6 max-w-9xl">
            <div className="">
              <h1 className="text-2xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-4xl">
                Settings
              </h1>

              <div className="pt-6 sm:pt-3">
                <Tabs value={activeTab} onTabChange={setActiveTab}>
                  <Tabs.List
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                  />

                  <Tabs.Panel value="users" className="pt-5">
                    {canReadUsers && <UsersTab />}
                  </Tabs.Panel>

                  <Tabs.Panel value="rolepermissions" className="pt-5">
                    {canReadRolePermissions && <RolePermissionsTab />}
                  </Tabs.Panel>
                </Tabs>
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
