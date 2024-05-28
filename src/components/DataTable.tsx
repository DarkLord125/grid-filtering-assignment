import React, { ReactNode } from "react";
import { HeaderGroup, Row, flexRender, ColumnDef } from "@tanstack/react-table";
import cn from "classnames";

interface DataTableProps<T> {
  headerGroups: HeaderGroup<T>[];
  rows: Row<T>[];
  columns: ColumnDef<T>[];
  footerText?: ReactNode;
  tableClassname?: string;
}

export const DataTable = <T,>({
  headerGroups,
  rows,
  columns,
  footerText,
  tableClassname,
}: DataTableProps<T>) => {
  return (
    <div className="border-none relative w-full overflow-auto">
      <table className={cn("mb-28 w-full text-sm", tableClassname)}>
        {/* Table Header */}
        <thead className="bg-gray-100 py-10">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-[74px] font-normal border-b"
                  style={{ width: header.getSize() }}
                >
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center">
                No results.
              </td>
            </tr>
          )}
        </tbody>

        {/* Table Footer */}
        {footerText && (
          <tfoot>
            <tr>
              <td
                colSpan={columns.length}
                className="py-5 px-10 text-right font-medium text-lg"
              >
                {footerText}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};
