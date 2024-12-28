import { useCallback, useEffect, useState } from "react";
import { IInvoice, IInvoiceRequest } from "../../../interfaces/bill-interface";
import { getListInvoice } from "../../../services/invoice-service";
import "./InvoicePage.scss";
import { ETimeRange, ISelectOptions } from "../../../interfaces/common";
import _ from "lodash";
import Table from "../../../components/table/Table";
import { MenuItem, TextField } from "@mui/material";
import { invoiceColumns } from "../../../components/table/table-data";

const listStatus: ISelectOptions[] = [
  { label: "Tất cả", value: "default" },
  { label: "Hoàn thành", value: 1 },
  { label: "Đã hủy", value: 2 },
  { label: "Đang xử lý", value: 3 },
  { label: "Không giao", value: 5 },
];

const listTimeRange: ISelectOptions[] = [
  { label: "Hôm nay", value: ETimeRange.TODAY },
  { label: "Tuần này", value: ETimeRange.THIS_WEEK },
  { label: "Tháng này", value: ETimeRange.THIS_MONTH },
  { label: "Năm này", value: ETimeRange.THIS_YEAR },
];

const InvoicePage = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  const [filtered, setFiltered] = useState<IInvoiceRequest>({
    pageSize: 20,
    currentItem: 0,
    orderBy: "createdDate",
    orderDirection: "DESC",
  });

  const handleGetInvoices = () => {
    getListInvoice(filtered).then((res) => {
      if (res) {
        setTotal(res?.total);
        setInvoices(res.data);
      }
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });
  };

  const handleInputSearchText = (values: string) => {
    debouncedFetch(values);
  };

  const debouncedFetch = useCallback(
    _.debounce(
      (values) => setFiltered({ ...filtered, customerCode: values }),
      1000
    ),
    [filtered]
  );

  const handleSetCurrentItem = useCallback(
    _.debounce((index) => {
      setFiltered({ ...filtered, currentItem: index });
    }, 500),
    [filtered]
  );

  const onChangeTimeRange = (timeRange: ETimeRange) => {
    switch (timeRange) {
      case ETimeRange.TODAY:
        setFiltered({
          ...filtered,
          currentItem: 0,
          lastModifiedFrom: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ).toISOString(),
        });
        break;
      case ETimeRange.THIS_WEEK: {
        setFiltered({
          ...filtered,
          currentItem: 0,
          toDate: new Date().toISOString(),
          lastModifiedFrom: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - new Date().getDay() + 1
          ).toISOString(),
        });
        break;
      }
      case ETimeRange.THIS_MONTH:
        setFiltered({
          ...filtered,
          currentItem: 0,
          toDate: new Date().toISOString(),
          lastModifiedFrom: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ).toISOString(),
        });
        break;
      case ETimeRange.THIS_YEAR:
        setFiltered({
          ...filtered,
          currentItem: 0,
          toDate: new Date().toISOString(),
          lastModifiedFrom: new Date(
            new Date().getFullYear(),
            0,
            0
          ).toISOString(),
        });
        break;
    }
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      handleGetInvoices();
    }
  }, [filtered]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">Danh sách hóa đơn</div>
      </div>
      <div className="page-contents">
        <div className="Invoices">
          <div className="Invoices__filter">
            <div className="Invoices__filter-item">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                disabled={loading}
                variant="outlined"
                size="small"
                onChange={(e) => handleInputSearchText(e.target.value)}
              />
            </div>
            <div className="Invoices__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Trạng thái"
                size="small"
                disabled={loading}
                defaultValue="default"
                helperText=""
                onChange={(event) => {
                  setTotal(0);
                  if (event.target.value !== "default") {
                    setFiltered({
                      ...filtered,
                      currentItem: 0,
                      status: [parseInt(event.target.value)],
                    });
                  } else {
                    setFiltered({
                      ...filtered,
                      currentItem: 0,
                      status: [],
                    });
                  }
                }}
              >
                {listStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="Invoices__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Thời gian cập nhật lần cuối"
                disabled={loading}
                size="small"
                defaultValue={ETimeRange.THIS_YEAR}
                helperText=""
                onChange={(event) => {
                  onChangeTimeRange(event.target.value as ETimeRange);
                }}
              >
                {listTimeRange.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          <div className="">
            <Table
              currentItem={filtered.currentItem}
              isLoading={loading}
              total={total}
              pageSize={filtered.pageSize}
              handleSetCurrentItem={handleSetCurrentItem}
              columns={invoiceColumns}
              rows={invoices}
              className="DataTable"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
