import { SearchInput } from "@/components";
import {
  Button,
  PaginatedTableProvider,
  useGlobalFilter,
} from "@/components/forms";
import { UserListTable } from "@/domain/users";
import { IconCirclePlus } from "@tabler/icons";
import "@tanstack/react-table";

function UsersTab() {
  const { globalFilter, queryFilter, calculateAndSetQueryFilter } =
    useGlobalFilter(
      (value) => `(firstName|lastName|identifier|username)@=*${value}`
    );
  // TODO add email filter separately due to Value Object

  return (
    <>
      <h3 className="h3">Users</h3>
      <div className="py-4">
        <PaginatedTableProvider>
          <div className="flex items-center justify-between">
            <div className="mt-1">
              <SearchInput
                value={globalFilter ?? ""}
                onChange={(value) => calculateAndSetQueryFilter(String(value))}
                placeholder="Search all columns..."
              />
            </div>

            <Button
              href="settings/users/new"
              icon={<IconCirclePlus className="w-5 h-5" />}
            >
              Add User
            </Button>
          </div>

          <div className="pt-2">
            <UserListTable queryFilter={queryFilter} />
          </div>
        </PaginatedTableProvider>
      </div>
    </>
  );
}

export { UsersTab };
