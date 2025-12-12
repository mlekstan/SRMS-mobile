import { LangKeys } from "@/types/lang-types";
import { createColumnHelper } from "@tanstack/react-table";
import { RentalTableDataType } from "./rentalTableDataAdapter";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<RentalTableDataType>();

const rentalTableColumns = [
  columnHelper.display({
    id: "lp",
    header: setHeader("rental.details.table.column.number"),
    cell: info => info.row.index + 1,
  }),

  columnHelper.accessor("name", {
    header: setHeader("rental.details.table.column.name"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),

  columnHelper.accessor(row => row.item?.barcode ?? "", {
    id: "barcode",
    header: setHeader("rental.details.table.column.barcode"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
];

export { rentalTableColumns };

