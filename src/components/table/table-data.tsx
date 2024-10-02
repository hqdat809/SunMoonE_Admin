import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import noProductImage from "../../assets/image/no-product-image.png";
import { IProductResponse } from "../../interfaces/product-interface";
import "./Table.scss";
import Checkbox from "../check-box/Checkbox";
import { Switch } from "@mui/material";

export const productColumns: GridColDef[] = [
  {
    field: "",
    headerName: "Ảnh",
    flex: 1,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-image">
        <img
          src={params.row?.images ? params.row?.images[0] : noProductImage}
          alt="product-image"
        />
      </div>
    ),
  },
  {
    field: "fullName",
    headerName: "TÊN",
    flex: 3,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-name">{params.row?.fullName}</div>
    ),
  },
  {
    field: "code",
    flex: 1,
    headerName: "MÃ",
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-code">{params.row?.code}</div>
    ),
  },
  {
    field: "categoryName",
    headerName: "DANH MỤC",
    flex: 3,
    width: 240,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-collection">{params.row?.categoryName}</div>
    ),
  },
  {
    field: "basePrice",
    headerName: "GIÁ BÁN",
    flex: 1,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-price">{params.row?.basePrice}</div>
    ),
  },
  {
    field: "conversionValue",
    headerName: "ĐƠN VỊ",
    flex: 1,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-conversion">{params.row?.conversionValue}</div>
    ),
  },
  {
    field: "isActive",
    headerName: "TRẠNG THÁI",
    flex: 1,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-status">
        <Switch
          defaultChecked={params.row?.isActive}
          name="loading"
          color="primary"
        />
      </div>
    ),
  },
];
