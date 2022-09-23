import { ComboBox } from "@/components/forms";
import {
  createStyles,
  Tabs as MantineTabs,
  TabsProps as MantineTabsProps,
} from "@mantine/core";
import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface TabsProps extends MantineTabsProps {}
interface TabsListProps {
  activeTab: string | null;
  setActiveTab: Dispatch<SetStateAction<string | null>>;
  tabs: Tab[];
}

interface Tab {
  value: string;
  label: string;
  icon?: ReactNode;
  rightSection?: ReactNode;
}

function Tabs({ ...rest }: TabsProps) {
  const useStyles = createStyles({});
  const { cx } = useStyles();

  return (
    <MantineTabs
      classNames={{
        tabsList: cx("border-slate-200 dark:border-slate-400"),
        tab: cx(
          "disabled:text-slate-300/50 dark:disabled:text-slate-300/50",
          "data-active:text-violet-600 data-active:border-violet-600 dark:data-active:text-violet-600 dark:data-active:border-violet-600",
          "text-slate-700 dark:text-slate-400 hover:text-slate-500 dark:hover:text-slate-300",
          "hover:border-slate-500 dark:hover:border-slate-300",
          "bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
        ),
      }}
      {...rest}
    >
      {rest.children}
    </MantineTabs>
  );
}

function TabsList({
  tabs = [],
  activeTab,
  setActiveTab,
  ...rest
}: TabsListProps) {
  return (
    <>
      <ComboBox
        aria-label={"tab-selector"}
        testSelector={"tab-selector"}
        data={tabs.map((tab) => ({
          value: tab.value,
          label: tab.label,
        }))}
        value={activeTab}
        onChange={(e) => setActiveTab(e)}
        className="block w-full sm:hidden"
      />

      <MantineTabs.List {...rest} className={clsx("hidden sm:flex ")}>
        {tabs.map((tab) => (
          <MantineTabs.Tab
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            rightSection={tab.rightSection}
          >
            {tab.label}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>
    </>
  );
}
TabsList.displayName = "TabsList";

Tabs.List = TabsList;
Tabs.Panel = MantineTabs.Panel;

export { Tabs };
