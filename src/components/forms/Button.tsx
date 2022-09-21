import { getTestSelector } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

export type ButtonStyle = "primary" | "secondary" | "warning";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  buttonStyle?: ButtonStyle;
  disabled?: boolean;
  id?: string;
  onClick?: (event?: any) => void;
  testSelector?: string;
  icon?: ReactNode;
  href?: string;
}

function Button({
  className = "",
  children,
  onClick,
  disabled,
  id,
  type = "button",
  buttonStyle = "primary",
  testSelector = getTestSelector(
    id || (typeof children === "string" ? children : "not-identified"),
    "button"
  ),
  icon,
  href,
  ...rest
}: ButtonProps) {
  const baseStyles = clsx(
    "px-3 py-2 border rounded-md shadow transition-all",
    buttonStyle === "primary" &&
      "text-white bg-violet-500 border-violet-700  dark:bg-violet-500/50 dark:border-violet-500/50 ",
    buttonStyle === "primary" &&
      !disabled &&
      "hover:bg-violet-600 dark:hover:bg-violet-600/50",
    buttonStyle === "secondary" &&
      "bg-slate-100 text-slate-900  dark:bg-slate-900 dark:text-white ",
    buttonStyle === "secondary" &&
      !disabled &&
      "hover:bg-slate-200 dark:hover:bg-slate-700",
    buttonStyle === "warning" && "text-white bg-red-400 border-red-400 ",
    buttonStyle === "warning" &&
      !disabled &&
      "hover:bg-red-500 hover:border-red-500",
    icon && "flex items-center"
  );

  let renderAs = "button" as "button" | "link";
  if (href) renderAs = "link";

  return (
    <>
      {renderAs === "link" ? (
        <Link
          id={id}
          data-cy={testSelector}
          className={clsx(
            baseStyles,
            disabled
              ? "cursor-not-allowed pointer-events-none opacity-40"
              : "cursor-pointer",
            className
          )}
          href={href ?? ""}
          type={type}
          {...rest}
        >
          {icon && <span className="pr-2">{icon}</span>}
          {children}
        </Link>
      ) : (
        <button
          id={id}
          data-cy={testSelector}
          className={clsx(
            baseStyles,
            disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
            className
          )}
          onClick={onClick}
          type={type}
          disabled={disabled}
          {...rest}
        >
          {icon && <span className="pr-2">{icon}</span>}
          {children}
        </button>
      )}
    </>
  );
}

export { Button };
