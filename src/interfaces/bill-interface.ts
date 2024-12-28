export interface IInvoice {
  id: number;
  uuid: string;
  code: string;
  purchaseDate: Date;
  branchId: number;
  branchName: string;
  soldById: number;
  soldByName: string;
  customerId?: number;
  customerCode: string;
  customerName: string;
  orderId?: number;
  orderCode: string;
  total: number;
  totalPayment: number;
  discount?: number;
  status: number;
  statusValue: string;
  description?: string;
  usingCod: boolean;
  modifiedDate: Date;
  createdDate: Date;
  invoiceDetails: InvoiceDetail[];
  saleChannelId?: number;
  discountRatio?: number;
}

export interface InvoiceDetail {
  productId: number;
  productCode: string;
  productName: string;
  categoryId: number;
  categoryName: string;
  quantity: number;
  price: number;
  discount: number;
  discountRatio?: number;
  usePoint?: boolean;
  subTotal: number;
  serialNumbers: string;
  returnQuantity: number;
  note?: string;
}

export interface IInvoiceRequest {
  branchIds?: number[]; // ID chi nhánh
  customerIds?: number[]; // Id khách hàng
  customerCode?: string; //Mã khách hàng
  status?: number[]; // Tình trạng đặt hàng
  includePayment?: boolean; // có lấy thông tin thanh toán
  includeInvoiceDelivery?: boolean; //hóa đơn có giao hàng hay không
  lastModifiedFrom?: string; // thời gian cập nhật
  pageSize?: number; // số items trong 1 trang; mặc định 20 items; tối đa 100 items
  currentItem?: number;
  toDate?: string; //Thời gian cập nhật cho đến thời điểm toDate
  orderBy?: string; //Sắp xếp dữ liệu theo trường orderBy (Ví dụ?: orderBy=name)
  orderDirection?: string; //Sắp xếp kết quả trả về theo?: Tăng dần Asc (Mặc định); giảm dần Desc orderId?: long; // Lọc danh sách hóa đơn theo Id của đơn đặt hàng
  createdDate?: string; //Thời gian tạo
  fromPurchaseDate?: string; //Từ ngày giao dịch
  toPurchaseDate?: string; //Đến ngày giao dịch
}
