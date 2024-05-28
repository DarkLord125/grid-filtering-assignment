"use client";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { StudentDetails } from "../../../types/student.types";
import { useGetStudentList } from "../../../hooks/student.hooks";
import { useEffect, useMemo } from "react";
import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/navigation";

const columns: ColumnDef<StudentDetails>[] = [
  {
    header: "S.No",
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    header: "ID",
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    header: "Name",
    cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
  },
  {
    header: "Total Marks",
    cell: ({ row }) => (
      <div className="text-center">{row.original.totalMarks}</div>
    ),
  },
  {
    header: "Age",
    cell: ({ row }) => <div className="text-center">{row.original.age}</div>,
  },
  {
    header: "Grade",
    cell: ({ row }) => <div className="text-center">{row.original.grade}</div>,
  },
  {
    header: "Email",
    cell: ({ row }) => <div className="text-center">{row.original.email}</div>,
  },
];

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const page = searchParams["page_number"] ?? "1";
  const limit = searchParams["page_size"] ?? "10";
  const name = searchParams["name"] ?? "";
  const age = searchParams["age"] ?? "";

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (!params.has("page_number") || !params.has("page_size")) {
      params.set("page_number", page as string);
      params.set("page_size", limit as string);
      router.push(`${url.pathname}?${params.toString()}`);
    }
  }, [page, limit, router]);

  const { data } = useGetStudentList(
    page as string,
    limit as string,
    name as string,
    age as string
  );

  const studentList = useMemo(() => data || [], [data]);

  const table = useReactTable<StudentDetails>({
    data: studentList,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <DataTable<StudentDetails>
        headerGroups={table.getHeaderGroups()}
        rows={table.getRowModel().rows || []}
        columns={columns}
      />
    </div>
  );
}
