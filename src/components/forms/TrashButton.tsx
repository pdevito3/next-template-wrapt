import { IconTrash } from "@tabler/icons";
import clsx from "clsx";
import { MouseEvent } from "react";

interface TrashButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  hideInGroup?: boolean;
}

function TrashButton({ onClick, hideInGroup = true }: TrashButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center px-2 py-2 text-sm font-medium leading-5 transition duration-100 ease-in bg-white border border-gray-300 rounded-full shadow-sm",
        "hover:bg-red-200 hover:text-red-800 hover:outline-none",
        "dark:border-slate-900 dark:bg-slate-800 dark:text-white dark:hover:bg-red-800 dark:hover:text-red-300 dark:hover:outline-none",
        "sm:px-3 sm:py-1 dark:hover:shadow dark:shadow-red-400 dark:hover:shadow-red-300",
        hideInGroup && "sm:opacity-0 sm:group-hover:opacity-100"
      )}
    >
      <IconTrash className="w-4 h-4" />
    </button>
  );
}

export { TrashButton };
