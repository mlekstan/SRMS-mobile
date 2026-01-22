import { useContext, useEffect, useMemo } from "react";

import { RentalTableDataContext } from "./RentalTableDataProvider";
import { RentalSale } from "@/api/types";


export function useRentalTableData(rawData?: RentalSale) {
  const value = useContext(RentalTableDataContext);
  
  useEffect(() => {
    if (rawData)
      value.setRawData(rawData);
  }, [rawData]);

  return value;
}