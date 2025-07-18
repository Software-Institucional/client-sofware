"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings,
} from "lucide-react";
import { getColumnLabel } from "@/lib/utils";
import { DataTableFacetedFilter } from "@/components/dashboard/users/table/faceted-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  filters: {
    role: string[];
    activate: string[];
    isEmailVerified: string[];
  };
  onFiltersChange: (filters: {
    role: string[];
    activate: string[];
    isEmailVerified: string[];
  }) => void;

  filterColumn?: string;
  filterPlaceholder?: string;
  showColumnToggle?: boolean;

  isLoading?: boolean;

  roleOptions?: { label: string; value: string }[];
  statusOptions?: { label: string; value: string }[];
  verifiedOptions?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  pageIndex: number;
  onPageChange: (pageIndex: number) => void;
  pageCount: number;

  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filtrar...",
  showColumnToggle = true,
  isLoading,

  filters,
  onFiltersChange,
  onSearchQueryChange,
  searchQuery,

  roleOptions,
  statusOptions,
  verifiedOptions,

  pageIndex,
  onPageChange,
  pageCount,
  pageSize,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      onPageChange(newState.pageIndex);
      onPageSizeChange(newState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-4 w-full">
          {filterColumn && (
            <Input
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder={filterPlaceholder}
              className="max-w-sm bg-white"
            />
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between items-end w-full">
            <div className="flex flex-wrap items-start gap-3 w-full">
              {table.getColumn("role") &&
                roleOptions &&
                roleOptions.length > 0 && (
                  <DataTableFacetedFilter
                    column={table.getColumn("role")}
                    title="Rol"
                    options={roleOptions}
                    selectedValues={filters.role}
                    onChange={(newSelectedValues) =>
                      onFiltersChange({
                        ...filters,
                        role: newSelectedValues,
                      })
                    }
                    onClear={() =>
                      onFiltersChange({
                        ...filters,
                        role: [],
                      })
                    }
                  />
                )}

              {table.getColumn("activate") &&
                statusOptions &&
                statusOptions.length > 0 && (
                  <DataTableFacetedFilter
                    column={table.getColumn("activate")}
                    title="Estado"
                    options={statusOptions}
                    selectedValues={filters.activate}
                    onChange={(newSelectedValues) =>
                      onFiltersChange({
                        ...filters,
                        activate: newSelectedValues,
                      })
                    }
                    onClear={() =>
                      onFiltersChange({
                        ...filters,
                        activate: [],
                      })
                    }
                  />
                )}

              {table.getColumn("isEmailVerified") &&
                verifiedOptions &&
                verifiedOptions.length > 0 && (
                  <DataTableFacetedFilter
                    column={table.getColumn("isEmailVerified")}
                    title="Verificación"
                    options={verifiedOptions}
                    selectedValues={filters.isEmailVerified}
                    onChange={(newSelectedValues) =>
                      onFiltersChange({
                        ...filters,
                        isEmailVerified: newSelectedValues,
                      })
                    }
                    onClear={() =>
                      onFiltersChange({
                        ...filters,
                        isEmailVerified: [],
                      })
                    }
                  />
                )}
            </div>

            {showColumnToggle && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="max-sm:w-full">
                    <Settings className="h-4 w-4 mr-2" /> Columnas
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {getColumnLabel(column.id)}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center items-center gap-2">
                    <svg
                      className="animate-spin h-6 w-6 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>

                    <span className="text-sm text-muted-foreground">
                      Cargando...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Página {pageIndex + 1} de {pageCount}
          </p>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 w-16 rounded-md border border-input bg-background px-2 text-xs"
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex + 1 >= pageCount}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageCount - 1)}
            disabled={pageIndex + 1 >= pageCount}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
