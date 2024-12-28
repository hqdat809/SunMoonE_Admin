import { Chip, MenuItem, Switch, TextField, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import noProductImage from "../../assets/image/no-product-image.png";
import { ICollections } from "../../interfaces/collection-interface";
import { ICustomer } from "../../interfaces/customer-interface";
import { IOrder } from "../../interfaces/order-interface";
import { IProductResponse } from "../../interfaces/product-interface";
import { IUserBank, IUserData, RoleEnum } from "../../interfaces/user-interfaces";
import CategoryCustomer from "../../pages/product/categoryCustomer/CategoryCustomer";
import CollectionNameColumn from "../../pages/product/collection/name-column/CollectionNameColumn";
import { formatDate } from "../../utils/date-utils";
import "./Table.scss";

export const productColumns: GridColDef[] = [
  {
    field: "images",
    headerName: "Ảnh",
    flex: 1,
    disableColumnMenu: true,
    maxWidth: 76,
    sortable: false,
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
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-name">{params.row?.fullName}</div>
    ),
  },
  {
    field: "code",
    flex: 1,
    headerName: "MÃ",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-code">{params.row?.code}</div>
    ),
  },
  {
    field: "categoryName",
    headerName: "DANH MỤC",
    flex: 2,
    width: 240,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-collection">{params.row?.categoryName}</div>
    ),
  },
  {
    field: "basePrice",
    headerName: "GIÁ BÁN",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-price">{params.row?.basePrice}</div>
    ),
  },
  {
    field: "categoryId",
    headerName: "Khách hàng",
    flex: 1,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <CategoryCustomer categoryId={params.row?.categoryId} />
    ),
  },
  {
    field: "isActive",
    headerName: "TRẠNG THÁI",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-status">
        <Switch
          checked={params.row?.isActive}
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
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-id">{params.row?.id}</div>
    ),
  },
  {
    field: "name",
    headerName: "TÊN",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-name">{params.row?.name}</div>
    ),
  },
  {
    field: "code",
    flex: 1,
    headerName: "MÃ",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-code">{params.row?.code}</div>
    ),
  },
  {
    field: "contactNumber",
    headerName: "SĐT",
    flex: 1,
    width: 240,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-contactNumber">{params.row?.contactNumber}</div>
    ),
  },

  {
    field: "address",
    headerName: "ĐỊA CHỈ",
    flex: 3,
    disableColumnMenu: true,
    sortable: false,
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
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-createdDate">
        {formatDate(`${params.row?.modifiedDate}`)}
      </div>
    ),
  },
];


export const userColumns: (updateRole: (userId: string, userRole: RoleEnum) => void, openDialog: (bankDetail: IUserBank) => void) => GridColDef[] = (updateRole, openDialog) => (
  [
    {
      field: "id",
      headerName: "ID",
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<IUserData>) => (
        <div className="customer-id">{params.row?.id}</div>
      ),
    },
    {
      field: "name",
      headerName: "TÊN",
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams<IUserData>) => (
        <div className="customer-name">{`${params.row?.firstName} ${params.row?.lastName}`}</div>
      ),
    },
    {
      field: "email",
      flex: 2,
      headerName: "EMAIL",
      renderCell: (params: GridRenderCellParams<IUserData>) => (
        <div className="customer-email">{params.row?.email}</div>
      ),
    },
    {
      field: "role",
      headerName: "HẠNG",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IUserData>) => (
        <div className="customer-role" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <TextField
            id="outlined-select-currency"
            select
            variant="standard"
            size="small"
            value={params.row?.role}
            helperText=""
            onChange={(event) => {
              updateRole(params.row?.id, event.target.value as RoleEnum);
            }}
          >
            {Object.keys(RoleEnum).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </div>
      ),
    },
    {
      field: "bank",
      headerName: "NGÂN HÀNG",
      flex: 1,
      renderCell: (params: GridRenderCellParams<IUserData>) => {

        const bank = params.row?.userBank

        if (!bank) {
          return <Chip label="Chưa cập nhật" color="error" variant="outlined" />
        }

        return <Chip label="Nhấn để mở" color="success" style={{ cursor: "pointer" }} onClick={() => openDialog(bank)} />
      }
    },
  ])

export const orderColumns: GridColDef[] = [
  {
    field: "code",
    flex: 1,
    headerName: "MÃ ĐẶT HÀNG",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-code">{params.row?.code}</div>
    ),
  },
  {
    field: "createdDate",
    headerName: "THỜI GIAN TẠO",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-createdDate">
        {formatDate(`${params.row?.createdDate}`, true)}
      </div>
    ),
  },
  {
    field: "modifiedDate",
    headerName: "CẬP NHẬT LẦN CUỐI",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-createdDate">
        {params.row?.modifiedDate
          ? formatDate(`${params.row?.modifiedDate}`, true)
          : formatDate(`${params.row?.createdDate}`, true)}
      </div>
    ),
  },

  {
    field: "customerName",
    headerName: "KHÁCH HÀNG",
    flex: 2,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "total",
    headerName: "TỔNG HÓA ĐƠN",
    flex: 1,
    align: "right",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IOrder>) => (
      <div className="product-code">{params.row?.total.toLocaleString()}</div>
    ),
  },
  {
    field: "totalPayment",
    headerName: "ĐÃ THANH TOÁN",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
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
    disableColumnMenu: true,
    sortable: false,
  },
];

export const invoiceColumns: GridColDef[] = [
  {
    field: "code",
    flex: 1,
    headerName: "MÃ ĐẶT HÀNG",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IProductResponse>) => (
      <div className="product-code">{params.row?.code}</div>
    ),
  },
  {
    field: "createdDate",
    headerName: "THỜI GIAN TẠO",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-createdDate">
        {formatDate(`${params.row?.createdDate}`, true)}
      </div>
    ),
  },
  {
    field: "modifiedDate",
    headerName: "CẬP NHẬT LẦN CUỐI",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICustomer>) => (
      <div className="customer-createdDate">
        {params.row?.modifiedDate
          ? formatDate(`${params.row?.modifiedDate}`, true)
          : formatDate(`${params.row?.createdDate}`, true)}
      </div>
    ),
  },

  {
    field: "customerName",
    headerName: "KHÁCH HÀNG",
    flex: 2,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "total",
    headerName: "TỔNG HÓA ĐƠN",
    flex: 1,
    align: "right",
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<IOrder>) => (
      <div className="product-code">{params.row?.total.toLocaleString()}</div>
    ),
  },
  {
    field: "totalPayment",
    headerName: "ĐÃ THANH TOÁN",
    flex: 1,
    disableColumnMenu: true,
    sortable: false,
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
    disableColumnMenu: true,
    sortable: false,
  },
];

export const collectionsColumns: GridColDef[] = [
  {
    field: "categoryId",
    disableColumnMenu: true,
    sortable: false,
    flex: 1,
    headerName: "ID",
  },
  {
    field: "categoryName",
    headerName: "TÊN",
    flex: 7,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICollections>) => (
      <CollectionNameColumn
        name={params.row?.categoryName}
        collectionId={params.row?.categoryId}
      />
    ),
  },
  {
    field: "parentId",
    headerName: "Danh mục cha",
    flex: 7,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ICollections>) => (
      <CollectionNameColumn collectionId={params.row?.parentId} />
    ),
  },
];
