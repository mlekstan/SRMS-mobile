import { Item } from "@/api/types";
import { RentalSalePosition } from "./RentalTable";

export type RentalTableDataType = {
  rowId: string;
  positionId: number;
  subcategoryId: number;
  rentalLength: { minutes: number };
  charge: number;
  name: string;
  item: Item | null;
}

export function rentalTableDataAdapter(data: RentalSalePosition[]) {

  return data.reduce((prev, pos) => {
    const n = pos.numberOfItems;

    for (let i = 0; i < n; i++) {
      prev.push({
        rowId: `p${pos.id}-i${i}`,
        positionId: pos.id,
        subcategoryId: pos.subcategory.id,
        rentalLength: pos.rentalLength,
        charge: Number(pos.charge) / n,
        name: pos.subcategory.name,
        item: null,
      });
    }
    
    return prev;
    
  }, Array<RentalTableDataType>());

}