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
import { RentalSale } from "@/api/types";


export function RentalTable() {
  const { t } = useTranslationContext();
  const [modalData, setModalData] = useState<RentalTableDataType | null>(null);
  const { tableData } = useRentalTableData();

  const table = useReactTable({
    data: tableData,
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