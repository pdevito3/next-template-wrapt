import { getTestSelector } from "@/utils/testing";
import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import type { AriaCheckboxProps } from "@react-types/checkbox";
import { clsx } from "clsx";
import { forwardRef, useRef } from "react";

interface CheckboxProps extends AriaCheckboxProps {
  label: string;
  required?: boolean;
  error?: string | undefined;
  testSelector: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, required = false, error, testSelector, ...props }, ref) => {
    let state = useToggleState(props);
    let fallbackRef = useRef<HTMLInputElement>(null);
    // @ts-ignore
    let { inputProps } = useCheckbox(props, state, ref || fallbackRef);
    let { focusProps, isFocusVisible } = useFocusRing();

    let checkboxClassName = clsx(
      state.isSelected
        ? "bg-violet-500 group-active:bg-violet-600"
        : "input input-valid",
      "text-white",
      "border-2",
      "rounded",
      props.isDisabled
        ? "border-slate-300"
        : isFocusVisible || state.isSelected
        ? "border-violet-500 group-active:border-violet-600"
        : "border-slate-500 group-active:border-slate-600",
      "w-5",
      "h-5",
      "flex",
      "flex-shrink-0",
      "justify-center",
      "items-center",
      "mr-2",
      isFocusVisible ? "shadow-outline" : "",
      "transition",
      "ease-in-out",
      "duration-150"
    );

    let labelClassName = clsx(
      props.isDisabled
        ? "input-disabled"
        : clsx(
            "text-slate-700 dark:text-white"
            // "group-active:text-slate-800 dark:group-active:text-slate-300"
          ),
      "select-none"
    );

    return (
      <>
        <label className="flex items-center group">
          <VisuallyHidden>
            <input
              {...mergeProps(inputProps, focusProps)}
              required={required}
              ref={ref}
              cy-data={getTestSelector(testSelector)}
            />
          </VisuallyHidden>
          <div className={clsx(checkboxClassName)} aria-hidden="true">
            <svg className="w-3 h-3 stroke-current" viewBox="0 0 18 18">
              <polyline
                points="1 9 7 14 15 4"
                fill="none"
                strokeWidth={3}
                strokeDasharray={22}
                strokeDashoffset={state.isSelected ? 44 : 66}
                style={{
                  transition: "all 400ms",
                }}
              />
            </svg>
          </div>
          <span className={clsx(labelClassName, "form-label")}>{label}</span>
          {required && (
            <span className={clsx("text-red-400 pl-1 not-sr-only")}>*</span>
          )}
        </label>
        {error && <p className="text-sm text-error pt-0.5">{error}</p>}
      </>
    );
  }
);

Checkbox.displayName = "Checkbox";
export { Checkbox };
