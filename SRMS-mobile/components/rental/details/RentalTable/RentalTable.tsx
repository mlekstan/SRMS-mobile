import { apiClient } from "@/api/apiClientInstance";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { LangKeys } from "@/types/lang-types";
import { useQuery } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import { useRentalTableData } from "../useRentalTableData";
import { rentalTableColumns } from "./rental-table-columns";
import { RentalTableDataType } from "./rentalTableDataAdapter";
import { RowDataModal } from "./RowDataModal";


export type RentalSalePosition = {
  id: number,
  numberOfItems: number,
  rentalLength: {
    minutes: number
  },
  charge: string,
  surcharge: string,
  subcategory: {
    id: number,
    name: string
  }
}

export type RentalSale = {
  id: number;
  saleDate: string;
  actionRequired: boolean;
  chargePredicted: string;
  charge: string;
  surcharge: string;
  rentalSalePositions: RentalSalePosition[];
}


export function RentalTable() {
  const { t } = useTranslationContext();
  const [modalData, setModalData] = useState<RentalTableDataType | null>(null);
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["rentalPositions", barcode], 
    queryFn: () => apiClient.makeRequest<RentalSale[]>("/rentalSales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      searchParams: { barcode: barcode }
    })
  });

  const { tableData } = useRentalTableData(data);

  const table = useReactTable({
    data: tableData ?? Array<RentalTableDataType>(),
    columns: rentalTableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollView>
      <DataTable style={{}}>
        {
          table.getHeaderGroups().map(headerGroup => (
            <DataTable.Header key={headerGroup.id}>
              {
                headerGroup.headers.map(header => (
                  <DataTable.Title 
                    key={header.id}
                    style={{ flex: 1 }}
                  >
                    <Text>
                      {
                        flexRender(t(header.column.columnDef.header as LangKeys), header.getContext())
                      }   
                    </Text>
                  </DataTable.Title>
                ))
              }
            </DataTable.Header>
          ))
        }

        <View style={{}}>
          <ScrollView>
          {
            table.getRowModel().rows.map(row => (
              <DataTable.Row key={row.id} onPress={() => setModalData(row.original)}>
                {
                  row.getVisibleCells().map(cell => (
                    <DataTable.Cell key={cell.id} style={{ paddingRight: 10, width: "auto" }}>
                      <Text style={{}}>
                        {
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </Text>
                    </DataTable.Cell>
                  ))
                }
              </DataTable.Row>
            ))
          }
          </ScrollView>     
        </View>
      </DataTable>

      {
        (modalData) &&
        <RowDataModal
          data={modalData}
          onClose={() => setModalData(null)}
        />
      }
    </ScrollView>
  );
}