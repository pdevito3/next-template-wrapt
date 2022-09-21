import {
  PaginatedTable,
  TrashButton,
  usePaginatedTableContext,
} from "@/components/forms";
import useDeleteModal from "@/components/modal/ConfirmDeleteModal";
import { Notifications } from "@/components/notifications";
import {
  RolePermissionDto,
  useDeleteRolePermission,
  useRolePermissions,
} from "@/domain/rolePermissions";
import "@tanstack/react-table";
import { createColumnHelper, SortingState } from "@tanstack/react-table";

interface RolePermissionListTableProps {
  queryFilter?: string | undefined;
}

export function RolePermissionListTable({
  queryFilter,
}: RolePermissionListTableProps) {
  const { sorting, pageSize, pageNumber } = usePaginatedTableContext();

  const openDeleteModal = useDeleteModal();
  const deleteRolePermissionApi = useDeleteRolePermission();
  function deleteRolePermission(id: string) {
    deleteRolePermissionApi
      .mutateAsync(id)
      .then(() => {
        Notifications.success("RolePermission deleted successfully");
      })
      .catch((e) => {
        Notifications.error("There was an error deleting the rolePermission");
        console.error(e);
      });
  }

  const { data: rolePermissionResponse, isLoading } = useRolePermissions({
    sortOrder: sorting as SortingState,
    pageSize,
    pageNumber,
    filters: queryFilter,
    hasArtificialDelay: true,
  });
  const rolePermissionData = rolePermissionResponse?.data;
  const rolePermissionPagination = rolePermissionResponse?.pagination;

  const columnHelper = createColumnHelper<RolePermissionDto>();
  const columns = [
    columnHelper.accessor((row) => row.role, {
      id: "role",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Role</span>,
    }),
    columnHelper.accessor((row) => row.permission, {
      id: "permission",
      cell: (info) => <p className="">{info.getValue()}</p>,
      header: () => <span className="">Permission</span>,
    }),
    columnHelper.accessor("id", {
      enableSorting: false,
      meta: { thClassName: "w-10" },
      cell: (row) => (
        <div className="flex items-center justify-center w-full">
          <TrashButton
            onClick={(e) => {
              openDeleteModal({
                onConfirm: () => deleteRolePermission(row.getValue()),
              });
              e.stopPropagation();
            }}
          />
        </div>
      ),
      header: () => <span className=""></span>,
    }),
  ];

  return (
    <PaginatedTable
      data={rolePermissionData}
      columns={columns}
      apiPagination={rolePermissionPagination}
      entityPlural="RolePermissions"
      isLoading={isLoading}
    />
  );
}
