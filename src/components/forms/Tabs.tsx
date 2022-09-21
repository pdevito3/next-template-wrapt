import {
  createStyles,
  Tabs as MantineTabs,
  TabsProps as MantineTabsProps,
} from "@mantine/core";

interface TabsProps extends MantineTabsProps {}
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

Tabs.List = MantineTabs.List;
Tabs.Tab = MantineTabs.Tab;
Tabs.Panel = MantineTabs.Panel;

export { Tabs };
