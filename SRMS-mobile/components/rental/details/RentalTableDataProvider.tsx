import { Item, RentalSale } from "@/api/types";
import { createContext, PropsWithChildren, useEffect, useMemo, useReducer, useState } from "react";
import { rentalTableDataAdapter, RentalTableDataType } from "./RentalTable/rentalTableDataAdapter";


export const RentalTableDataContext = createContext<{
  tableData: RentalTableDataType[];
  setRawData: (rawData: RentalSale) => void;
  itemsToRows: Record<string, Item>[]; 
  setItemToRow: (itemToRow: Record<string, Item>) => void;
  isFull: boolean;
  reset: () => void;
}>({
  tableData: Array<RentalTableDataType>(),
  setRawData: () => null,
  itemsToRows: Array<Record<string, Item>>(),
  setItemToRow: () => null,
  isFull: false,
  reset: () => null,
});



function reducer(state: Record<string, Item>[], action: Record<string, Item> | null) {
  if (action === null) {
    return Array<Record<string, Item>>()
  }
  const newState = [...state];
  newState.push(action);
  return newState;
}


export function RentalTableDataProvider({ children }: PropsWithChildren) {
  const [reset, setReset] = useState(false);
  const [itemsToRows, setItemToRow] = useReducer(reducer, Array<Record<string, Item>>());
  const [rawData, setRawData] = useState<RentalSale>();

  useEffect(() => {
    if (reset) {
      setItemToRow(null);
      setRawData(undefined);
      setReset(false);
    }
  }, [reset]);

  const tableData = useMemo(() => {
    if (!rawData) {
      return Array<RentalTableDataType>();
    }
    const adaptedData = rentalTableDataAdapter(rawData.rentalSalePositions);
    const tableData = adaptedData.map((row) => {
      const itemToRow = itemsToRows.find((v) => row.rowId in v);
      
      if (itemToRow) {
        row.item = itemToRow[row.rowId];
      }

      return row;
    });

    return tableData;
  },[rawData, itemsToRows]);

  const isFull = useMemo(() => {
    return ((itemsToRows.length > 0) && (tableData.length === itemsToRows.length));
  }, [tableData, itemsToRows]);


  return (
    <RentalTableDataContext.Provider 
      value={{ 
        tableData,
        setRawData: (rawData: RentalSale) => setRawData(rawData),
        itemsToRows, 
        setItemToRow: (itemToRow: Record<string, Item>) => setItemToRow(itemToRow),
        isFull,
        reset: () => setReset(true),
      }}
    >
      { children }
    </RentalTableDataContext.Provider>
  );
}