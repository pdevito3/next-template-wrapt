import { FormControlState } from "@/types";
import { getTestSelector } from "@/utils/testing";
import { createStyles, Select, SelectProps } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconChevronDown } from "@tabler/icons";
import clsx from "clsx";
import { forwardRef } from "react";

interface ComboBoxProps extends SelectProps {
  testSelector: string;
  errorSrOnly?: boolean;
}

const ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(
  ({ testSelector, errorSrOnly, ...rest }, ref) => {
    const useStyles = createStyles({});
    const { classes, cx } = useStyles();
    const { error, disabled, value, clearable } = rest;

    let inputState = "valid" as typeof FormControlState[number];
    if (error) inputState = "invalid";
    if (disabled) inputState = "disabled";

    const showClearable = clearable && value !== null && value !== undefined;

    interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
      label: string;
      value: string;
      "data-selected": boolean;
      "data-hovered": boolean;
    }

    const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
      (
        {
          label,
          value,
          "data-selected": isSelected,
          "data-hovered": isHovered,
          ...others
        }: ItemProps,
        ref
      ) => {
        return (
          <div
            ref={ref}
            {...others}
            cy-data={getTestSelector(`${testSelector}-${value}`)}
            className={clsx(
              "relative cursor-default select-none py-2 pl-10 pr-4",
              isHovered
                ? "bg-slate-200 text-slate-600 dark:bg-slate-600 dark:text-white"
                : "text-slate-900 dark:text-white"
            )}
          >
            <span
              className={clsx(
                "block truncate",
                isSelected ? "font-medium" : "font-normal"
              )}
            >
              {isSelected ? (
                <span
                  className={clsx(
                    `absolute inset-y-0 left-0 flex items-center pl-3`
                  )}
                >
                  <IconCheck
                    className={clsx(
                      "w-5 h-5",
                      isHovered
                        ? "text-slate-600 dark:text-white"
                        : "text-violet-500 dark:text-violet-500"
                    )}
                    aria-hidden="true"
                  />
                </span>
              ) : null}
              <p>{label}</p>
            </span>
          </div>
        );
      }
    );
    SelectItem.displayName = "SelectItem";

    return (
      <Select
        ref={ref}
        size="md"
        cy-data={getTestSelector(testSelector)}
        transition="pop"
        transitionDuration={80}
        transitionTimingFunction="ease"
        itemComponent={SelectItem}
        classNames={{
          root: cx("input-root"),
          input: cx(
            clsx(
              "input",
              inputState === "valid" && "input-valid",
              inputState === "invalid" && "input-invalid"
            )
          ),
          disabled: cx("input-disabled"),
          error: cx(clsx("form-error text-error", errorSrOnly && "sr-only")),
          label: cx("form-label"),
          required: cx("text-error"),
          dropdown: cx("input-dropdown"),
          itemsWrapper: cx("input-items-wrapper"),
          wrapper: cx(clsx(errorSrOnly && "mb-0")),
          item: cx(clsx("input-item")),
          rightSection: cx(clsx(!showClearable && "pointer-events-none")),
        }}
        rightSection={
          !showClearable && (
            <div className="flex items-center justify-center space-x-2">
              {inputState === "invalid" && (
                <IconAlertCircle className="w-6 h-6 text-error" />
              )}
              <IconChevronDown
                className={clsx(
                  "w-4 h-4",
                  inputState === "invalid" && "text-error"
                )}
              />
            </div>
          )
        }
        rightSectionWidth={inputState === "invalid" ? 70 : 40}
        {...rest}
      />
    );
  }
);

ComboBox.displayName = "ComboBox";
export { ComboBox };
