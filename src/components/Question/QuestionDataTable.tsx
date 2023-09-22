import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Question } from "@/atoms/questionsAtom";
import { DataTable } from "../DataTable";

type QuestionDataTableProps = {
  questions: Question[];
};

const columnHelper = createColumnHelper<Question>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),

  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "Email",
  }),
  columnHelper.accessor("question", {
    cell: (info) => info.getValue(),
    header: "Question",
  }),
  columnHelper.accessor("updatedAt", {
    cell: (info) => info.getValue(),
    header: "Created At",
  }),
  columnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: "Status",
  }),
];

const QuestionDataTable: React.FC<QuestionDataTableProps> = ({ questions }) => {
  return <DataTable columns={columns} data={questions} />;
};
export default QuestionDataTable;
