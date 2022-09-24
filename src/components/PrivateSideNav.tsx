import { useCanAccessSettings } from "@/domain/permissions";
import logo from "@/images/logo.svg";
import { Dialog, Transition } from "@headlessui/react";
import {
  IconHome,
  IconLock,
  IconMenu2,
  IconSettings,
  IconX,
} from "@tabler/icons";
import clsx from "clsx";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

function PrivateSideNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  let navigation = [
    { name: "Home", href: "/", icon: IconHome },
    /* route marker - remove if you don't want feature routes added by default */
    { name: "Token Info", href: "/token", icon: IconLock },
  ];

  const canAccessSettings = useCanAccessSettings();
  if (canAccessSettings.hasPermission)
    navigation.push({
      name: "Settings",
      href: "/settings",
      icon: IconSettings,
    });

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="h-full">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-opacity-75 bg-slate-700" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-[400ms] transform"
            enterFrom="translate-y-full"
            enterTo="-translate-y-0"
            leave="transition ease-in-out duration-150 transform"
            leaveFrom="-translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="absolute bottom-0 w-full h-1/2">
              <div className="relative flex flex-col flex-1 w-full h-full rounded-t-xl bg-slate-50 dark:bg-slate-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-[400ms]"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-[400ms]"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 mr-2 -mt-12">
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <IconX
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <Link href={"/"}>
                      <Image className="w-auto h-8" src={logo} alt="Logo" />
                    </Link>
                  </div>
                  <nav className="mt-5">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          pathname === item.href
                            ? "border-l-4 border-white bg-slate-300 text-slate-900 dark:bg-slate-900 dark:text-white"
                            : "text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700 dark:hover:bg-opacity-75",
                          "group flex items-center p-4 text-base font-medium"
                        )}
                      >
                        <item.icon
                          className="flex-shrink-0 w-6 h-6 mr-4 text-slate-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="z-20 hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-1 min-h-0 bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center flex-shrink-0 h-16 px-4 shadow-md bg-slate-100 shadow-violet-500/40 dark:bg-slate-800">
            <Link href={"/"}>
              <Image className="w-auto h-8" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="flex flex-col flex-1 py-2 overflow-y-auto">
            <nav className="flex-1 mt-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    pathname === item.href
                      ? "border-l-4 border-violet-500 bg-slate-300 text-slate-900 dark:border-white dark:bg-slate-900 dark:text-white"
                      : "text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700 dark:hover:bg-opacity-75",
                    "group flex items-center px-3 py-3 text-sm font-medium"
                  )}
                >
                  <item.icon
                    className="flex-shrink-0 w-6 h-6 mr-3 text-slate-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 md:pl-64">
        <div className="absolute z-10 p-1 rounded-full bottom-4 right-4 bg-slate-100 sm:p-2 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <IconMenu2 className="w-6 h-6 text-slate-900" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { PrivateSideNav };
