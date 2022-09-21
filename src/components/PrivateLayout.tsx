import { PrivateHeader, PrivateSideNav } from "@/components";

interface Props {
  children: React.ReactNode;
}

export function PrivateLayout({ children }: Props) {
  return (
    <div className="flex flex-col w-full h-full">
      <PrivateHeader />
      <div className="flex h-full bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white">
        <PrivateSideNav />
        <main className="flex-1 px-4 py-2 overflow-auto bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white sm:px-6 md:py-4 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
