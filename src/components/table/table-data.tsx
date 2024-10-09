import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import noProductImage from "../../assets/image/no-product-image.png";
import { IProductResponse } from "../../interfaces/product-interface";
import "./Table.scss";
import Checkbox from "../check-box/Checkbox";
import { Switch, Tooltip } from "@mui/material";
import { ICustomer } from "../../interfaces/customer-interface";
import { formatDate } from "../../utils/date-utils";
import CategoryCustomer from "../../pages/product/categoryCustomer/CategoryCustomer";
import { IOrder } from "../../interfaces/order-interface";

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
    flex: 2,
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
    field: "categoryId",
    headerName: "Khách hàng",
    flex: 1,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <CategoryCustomer categoryId={params.row?.categoryId} />
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

export const customerColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-id">{params.row?.id}</div>
    ),
  },
  {
    field: "name",
    headerName: "TÊN",
    flex: 1,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-name">{params.row?.name}</div>
    ),
  },
  {
    field: "code",
    flex: 1,
    headerName: "MÃ",
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-code">{params.row?.code}</div>
    ),
  },
  {
    field: "contactNumber",
    headerName: "SĐT",
    flex: 1,
    width: 240,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-contactNumber">{params.row?.contactNumber}</div>
    ),
  },

  {
    field: "address",
    headerName: "ĐỊA CHỈ",
    flex: 3,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <Tooltip
        title={`${params.row?.address}, ${params.row?.wardName}, ${params.row?.locationName}`}
      >
        <div className="customer-address">{`${params.row?.address} - ${params.row?.wardName} - ${params.row?.locationName}`}</div>
      </Tooltip>
    ),
  },
  {
    field: "modifiedDate",
    headerName: "NGÀY TẠO",
    flex: 1,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-createdDate">
        {formatDate(`${params.row?.modifiedDate}`)}
      </div>
    ),
  },
];

export const orderColumns: GridColDef[] = [
  {
    field: "code",
    flex: 1,
    headerName: "MÃ ĐẶT HÀNG",
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-code">{params.row?.code}</div>
    ),
  },
  {
    field: "createdDate",
    headerName: "THỜI GIAN",
    flex: 1,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-createdDate">
        {formatDate(`${params.row?.modifiedDate}`, true)}
      </div>
    ),
  },

  {
    field: "customerName",
    headerName: "KHÁCH HÀNG",
    flex: 2,
  },
  {
    field: "total",
    headerName: "TỔNG HÓA ĐƠN",
    flex: 1,
    align: "right",
    renderCell: (params: GridRenderCellParams<IOrder>) => (
      <div className="product-code">{params.row?.total.toLocaleString()}</div>
    ),
  },
  {
    field: "totalPayment",
    headerName: "ĐÃ THANH TOÁN",
    flex: 1,
    align: "right",
    renderCell: (params: GridRenderCellParams<IOrder>) => (
      <div className="product-code">
        {params.row?.totalPayment.toLocaleString()}
      </div>
    ),
  },
  {
    field: "statusValue",
    headerName: "TRẠNG THÁI",
    flex: 1,
  },
];
