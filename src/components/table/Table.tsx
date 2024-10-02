/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { IKiotResponse } from "../../interfaces/common";

interface ITableProps {
  rows?: any[];
  columns: GridColDef[];
  isLoading?: boolean;
  notCheckBoxSelection?: boolean;
  setSelection?: (selection: any[]) => void;
  className?: string;
  total?: number;
  numberpage?: number;
  currentItem?: number;
  setCurrentItem?: (item: number) => void;
  pageSize?: number;
}

export default function Table({
  setSelection,
  rows,
  columns,
  isLoading,
  notCheckBoxSelection,
  className,
  total,
  numberpage,
  setCurrentItem,
  currentItem,
  pageSize,
}: ITableProps) {
  if (!total) {
    return (
      <div style={{ height: "100%", width: "100%", maxWidth: "100%" }}>
        ...Loading
      </div>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%", maxWidth: "100%" }}>
      <DataGrid
        rows={!isLoading ? rows || [] : []}
        rowCount={total}
        columns={columns}
        className={`${className} Table`}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSize },
          },
        }}
        onPaginationModelChange={(model) => {
          console.log("model", model);
          if (model.page === 0) {
            setCurrentItem?.(0);
          } else {
            setCurrentItem?.(model.page * model.pageSize + 1);
          }
        }}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(ids) => {
          const selectedRowsData = ids.map((id) =>
            rows?.find((row) => row.id === id)
          );
          setSelection?.(selectedRowsData);
        }}
        checkboxSelection={!notCheckBoxSelection}
        loading={isLoading}
      />
    </div>
  );
}
