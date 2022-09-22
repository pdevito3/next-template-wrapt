import { ComboBox } from "@/components/forms";
import { Pagination } from "@/types";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronUp,
} from "@tabler/icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import React from "react";

interface PaginatedTableContextResponse {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  initialPageSize: number;
}

const PaginatedTableContext =
  React.createContext<PaginatedTableContextResponse>(
    {} as PaginatedTableContextResponse
  );

const PageSizeOptions = [1, 10, 20, 30, 40, 50] as const;
export type PageSizeNumber = typeof PageSizeOptions[number];
interface PaginatedTableProviderProps {
  initialPageSize?: PageSizeNumber;
  children: React.ReactNode;
  props?: any;
}

function PaginatedTableProvider({
  initialPageSize = 10,
  props,
  children,
}: PaginatedTableProviderProps) {
  const [sorting, setSorting] = React.useState<SortingState>();
  const [pageSize, setPageSize] = React.useState<number>(initialPageSize);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const value = {
    sorting,
    setSorting,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    initialPageSize,
  };

  return (
    <PaginatedTableContext.Provider value={value} {...props}>
      {children}
    </PaginatedTableContext.Provider>
  );
}

function usePaginatedTableContext() {
  const context = React.useContext(PaginatedTableContext);
  if (Object.keys(context).length === 0)
    throw new Error(
      "usePaginatedTableContext must be used within a PaginatedTableProvider"
    );
  return context;
}

interface PaginatedTableProps {
  data: any[] | undefined;
  columns: ColumnDef<any, any>[];
  apiPagination: Pagination | undefined;
  entityPlural: string;
  isLoading?: boolean;
  onRowClick?: (row: Row<any>) => void;
}

function PaginatedTable({
  data = [],
  columns,
  apiPagination,
  entityPlural,
  isLoading = true,
  onRowClick,
}: PaginatedTableProps) {
  const rowIsClickable = onRowClick !== null && onRowClick !== undefined;
  const {
    sorting,
    setSorting,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    initialPageSize,
  } = usePaginatedTableContext();

  const skeletonRowCount = 2;

  const table = useReactTable({
    data: data ?? ([] as any[]),
    columns,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
    onSortingChange: setSorting,
    manualPagination: true,
    manualSorting: true,

    // pipeline
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    //
  });

  return (
    <div className="shadow-md">
      <div className="overflow-x-auto sm:rounded-t-lg bg-slate-50 dark:bg-slate-700 h-[39.4rem]">
        {isLoading ? (
          <div className="flex flex-col justify-between h-full divide-y">
            <table className="pl-6 animate-pulse">
              <thead>
                <tr className="">
                  {Array.from({ length: columns.length }, (_, colIndex) => (
                    <th key={`col${colIndex}`} className="px-6 py-3">
                      <div className="mb-2.5 h-2.5 w-1/3 rounded-full bg-slate-400 dark:bg-slate-900"></div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="pt-3 ">
                {Array.from({ length: skeletonRowCount }, (_, rowIndex) => (
                  <tr key={`row${rowIndex}`} className="px-6 py-3">
                    {Array.from({ length: columns.length }, (_, cellIndex) => (
                      <td
                        key={`row${cellIndex}col${rowIndex}`}
                        className="px-6 py-3"
                      >
                        <div
                          key={`row${cellIndex}col${rowIndex}`}
                          className="w-3/4 h-2 rounded-full bg-slate-200 dark:bg-slate-800"
                        ></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <span className="sr-only">{`Loading ${entityPlural} table...`}</span>
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              <div className="flex flex-col justify-between h-full divide-y">
                <table className="min-w-full text-sm text-left text-slate-500 dark:text-slate-400">
                  <thead className="text-xs uppercase text-slate-700 bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            className={`group cursor-pointer px-6 py-3 ${header.column.columnDef.meta?.thClassName}`}
                          >
                            {header.isPlaceholder ? null : (
                              <div
                                className={clsx(
                                  " inline-flex w-full",
                                  header.column.getCanSort()
                                    ? " select-none"
                                    : ""
                                )}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                <span className="w-5 ml-2">
                                  <span className="flex-none rounded">
                                    {{
                                      asc: (
                                        <IconChevronDown className="w-5 h-5" />
                                      ),
                                      desc: (
                                        <IconChevronUp className="w-5 h-5" />
                                      ),
                                    }[header.column.getIsSorted() as string] ??
                                      null}
                                  </span>
                                  <span className="flex-none invisible rounded opacity-50 group-hover:visible">
                                    {header.column.getIsSorted() ||
                                    !header.column.getCanSort() ? null : (
                                      <IconChevronDown className="w-5 h-5" />
                                    )}
                                  </span>
                                </span>
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={clsx(
                          "group border-b bg-white dark:border-slate-700 dark:bg-slate-800",
                          rowIsClickable
                            ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600"
                            : ""
                        )}
                        onClick={
                          rowIsClickable
                            ? () => onRowClick && onRowClick(row.original)
                            : undefined
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-6 py-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4">
                <p className="dark:text-slate-50">No {entityPlural} Found</p>
              </div>
            )}
          </>
        )}
      </div>
      <PaginationControls
        entityPlural={entityPlural}
        pageNumber={pageNumber}
        apiPagination={apiPagination}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

interface PaginationControlsProps {
  entityPlural: string;
  pageNumber: number;
  apiPagination: Pagination | undefined;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

function PaginationControls({
  entityPlural,
  pageNumber,
  apiPagination,
  pageSize,
  setPageSize,
  setPageNumber,
}: PaginationControlsProps) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-700 sm:rounded-b-lg"
      aria-label={`Table navigation for ${entityPlural} table`}
    >
      <div className="flex items-center flex-1 space-x-5">
        <span className="flex text-sm font-normal text-slate-500 dark:text-slate-400 min-w-[4rem]">
          <div>Page</div>
          <span className="pl-1 font-semibold text-slate-900 dark:text-white">
            {pageNumber}{" "}
            {apiPagination?.totalPages
              ? `of ${apiPagination?.totalPages}`
              : null}
          </span>
        </span>

        <div className="w-32">
          <ComboBox
            aria-label={"page-size-selector"}
            testSelector={"page-size-selector"}
            data={PageSizeOptions.map((selectedPageSize) => ({
              value: selectedPageSize.toString(),
              label: `Show ${selectedPageSize}`,
            }))}
            value={pageSize.toString()}
            onChange={(e) => {
              setPageSize(Number(e));
              setPageNumber(1);
            }}
          />
        </div>
      </div>

      <div className="inline-flex items-center -space-x-[2px]">
        <button
          aria-label="First page"
          className={clsx(
            "ml-0 block rounded-l-lg border border-slate-300 bg-white py-2 px-3 leading-tight text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
            !apiPagination?.hasPrevious
              ? "cursor-not-allowed opacity-50 transition-opacity duration-500"
              : "hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
          )}
          onClick={() => setPageNumber(1)}
          disabled={!apiPagination?.hasPrevious}
        >
          {<IconChevronsLeft className="w-5 h-5" />}
        </button>
        <button
          aria-label="Previous page"
          className={clsx(
            "inline border border-slate-300 bg-white py-2 px-3 leading-tight text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
            !apiPagination?.hasPrevious
              ? "cursor-not-allowed opacity-50 transition-opacity duration-500"
              : "hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
          )}
          onClick={() =>
            setPageNumber(
              apiPagination?.pageNumber ? apiPagination?.pageNumber - 1 : 1
            )
          }
          disabled={!apiPagination?.hasPrevious}
        >
          {<IconChevronLeft className="w-5 h-5" />}
        </button>
        <button
          aria-label="Next page"
          className={clsx(
            "inline border border-slate-300 bg-white py-2 px-3 leading-tight text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
            !apiPagination?.hasNext
              ? "cursor-not-allowed opacity-50 transition-opacity duration-500"
              : "hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
          )}
          onClick={() =>
            setPageNumber(
              apiPagination?.pageNumber ? apiPagination?.pageNumber + 1 : 1
            )
          }
          disabled={!apiPagination?.hasNext}
        >
          {<IconChevronRight className="w-5 h-5" />}
        </button>
        <button
          aria-label="Last page"
          className={clsx(
            "block rounded-r-lg border border-slate-300 bg-white py-2 px-3 leading-tight text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
            !apiPagination?.hasNext
              ? "cursor-not-allowed opacity-50 transition-opacity duration-500"
              : "hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
          )}
          onClick={() =>
            setPageNumber(
              apiPagination?.totalPages ? apiPagination?.totalPages : 1
            )
          }
          disabled={!apiPagination?.hasNext}
        >
          {<IconChevronsRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

function useGlobalFilter(
  filter: (value: React.SetStateAction<string | undefined>) => string
) {
  const [globalFilter, setGlobalFilter] = React.useState<string>();
  const [queryFilter, setQueryFilter] = React.useState<string>();

  function calculateAndSetQueryFilter(value: string) {
    value.length > 0
      ? setQueryFilter(() => filter(value))
      : setQueryFilter(undefined);
    setGlobalFilter(String(value));
  }

  return { globalFilter, queryFilter, calculateAndSetQueryFilter };
}

export {
  PaginatedTable,
  usePaginatedTableContext,
  PaginatedTableProvider,
  useGlobalFilter,
};
