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
  pageSize?: number;
}

const Table = ({
  setSelection,
  rows,
  columns,
  isLoading,
  notCheckBoxSelection,
  className,
  total,
  pageSize,
}: ITableProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setCurrentPage(0);
    console.log(rows);
  }, [rows]);

  if (total === undefined) {
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
        paginationModel={{ page: currentPage, pageSize: pageSize || 0 }}
        disableRowSelectionOnClick
        onPaginationModelChange={(event) => {
          setCurrentPage(event.page);
        }}
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
};

export default Table;
