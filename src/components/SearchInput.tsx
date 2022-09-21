import { DebouncedInput } from "@/components/forms";
import { IconSearch } from "@tabler/icons";
import "@tanstack/react-table";
import clsx from "clsx";

function SearchInput({
  value,
  onChange,
  debounce = 500,
  placeholder,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  placeholder?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <IconSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </div>

      <DebouncedInput
        {...props}
        value={value}
        onChange={onChange}
        debounce={debounce}
        placeholder={placeholder}
        className={clsx(
          "block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none w-80 bg-gray-50 focus:border-violet-500 focus:ring-violet-500",
          "dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500",
          props.className
        )}
      />
    </div>
  );
}

export { SearchInput };
