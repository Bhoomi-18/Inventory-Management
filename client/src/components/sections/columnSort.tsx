import { ArrowUpAZ, ArrowDownZA, MoreHorizontal } from "lucide-react";
import type { Header } from "@tanstack/react-table";

type Props = {
  header: Header<any, unknown>; 
  label: string;
};

const SortableHeader = ({ header, label }: Props) => {
  const column = header.column;
  const isSorted = column.getIsSorted();
  const canSort = column.getCanSort();

  if (!canSort) {
    return <span className="cursor-default">{label}</span>;
  }

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      {label}
      {isSorted === "asc" ? (
        <ArrowUpAZ className="w-4 h-4" />
      ) : isSorted === "desc" ? (
        <ArrowDownZA className="w-4 h-4" />
      ) : (
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
};

export default SortableHeader;