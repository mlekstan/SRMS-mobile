import { useContext, useEffect, useMemo } from "react";
import { RentalSale } from "./RentalTable/RentalTable";
import { RentalTableDataContext } from "./RentalTableDataProvider";


export function useRentalTableData(rawData?: RentalSale[]) {
  const value = useContext(RentalTableDataContext);
  
  useEffect(() => {
    if (rawData)
      value.setRawData(rawData);
  }, [rawData]);

  return value;
}