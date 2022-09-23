import { Tabs } from "@/components/forms";
import { RolePermissionsTab, UsersTab } from "@/components/settings";
import { IconShieldLock, IconUser } from "@tabler/icons";
import "@tanstack/react-table";
import Head from "next/head";
import { useState } from "react";
import { PrivateLayout } from "../../components/PrivateLayout";

Settings.isPublic = false;
export default function Settings() {
  const [activeTab, setActiveTab] = useState<string | null>("users");
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <PrivateLayout>
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
                  tabs={[
                    {
                      value: "users",
                      label: "Users",
                      icon: <IconUser className="w-5 h-5" />,
                    },
                    {
                      value: "rolepermissions",
                      label: "Role Permissions",
                      icon: <IconShieldLock className="w-5 h-5" />,
                    },
                  ]}
                />

                <Tabs.Panel value="users" className="pt-5">
                  <UsersTab />
                </Tabs.Panel>

                <Tabs.Panel value="rolepermissions" className="pt-5">
                  <RolePermissionsTab />
                </Tabs.Panel>
              </Tabs>
            </div>
          </div>
        </div>
      </PrivateLayout>
    </>
  );
}
