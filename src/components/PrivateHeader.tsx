import { ThemeToggle } from "@/components/ThemeToggle";
import useAuthUser from "@/domain/auth/hooks/useAuthUser";
import { Menu, Transition } from "@headlessui/react";
import { Avatar } from "@mantine/core";
import clsx from "clsx";
import { signOut } from "next-auth/react";
import { Fragment } from "react";

function PrivateHeader() {
  const { user } = useAuthUser();

  return (
    <nav className="relative w-full bg-white shadow-md h-private-header dark:bg-gray-800">
      <div className="px-2 mx-auto sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex-1"></div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-5 sm:static sm:inset-auto sm:ml-6 sm:space-x-4 sm:pr-0">
            <ThemeToggle />
            {/* <!-- Profile dropdown --> */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <Avatar
                    src={user?.image}
                    alt="avatar image"
                    radius="xl"
                    size="md"
                  >
                    {user.name?.at(0)}
                  </Avatar>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut()}
                        className={clsx(
                          active ? "bg-gray-100 dark:bg-gray-900" : "",
                          "w-full px-4 py-2 text-sm text-gray-700  dark:text-gray-50 text-start"
                        )}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { PrivateHeader };
