/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface ITableProps {
  rows?: any[];
  columns: GridColDef[];
  isLoading?: boolean;
  notCheckBoxSelection?: boolean;
  setSelection?: (selection: any[]) => void;
  handleSetCurrentItem?: (item: number) => void;
  className?: string;
  total?: number;
  pageSize?: number;
  currentItem?: number;
  tableId?: string;
}

const Table = ({
  setSelection,
  rows,
  columns,
  isLoading,
  notCheckBoxSelection,
  className,
  total,
  handleSetCurrentItem,
  currentItem,
  tableId,
  pageSize,
}: ITableProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (currentItem === 0) {
      setCurrentPage(0);
    }
  }, [currentItem]);

  // if (total == undefined) {
  //   return (
  //     <div style={{ height: "100%", width: "100%", maxWidth: "100%" }}>
  //       ...Loading
  //     </div>
  //   );
  // }

  return (
    <div style={{ height: "100%", width: "100%", maxWidth: "100%" }}>
      <DataGrid
        getRowId={(row) => (tableId ? row[tableId] : row.id)}
        rows={rows}
        rowCount={total}
        columns={columns}
        paginationMode="server"
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
          if (pageSize) {
            handleSetCurrentItem?.(event.page * pageSize);
          }
        }}
        hideFooter={total ? total < 20 : true}
        hideFooterPagination={isLoading}
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
