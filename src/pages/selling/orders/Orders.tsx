import { Button, MenuItem, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import { orderColumns } from "../../../components/table/table-data";
import { ETimeRange, ISelectOptions } from "../../../interfaces/common";
import { IOrder, IOrderRequest } from "../../../interfaces/order-interface";
import * as orderService from "../../../services/order-service";
import "./Orders.scss";
import { useGridStatePersistence } from "@mui/x-data-grid/internals";
import _ from "lodash";

const listStatus: ISelectOptions[] = [
  { label: "Tất cả", value: "default" },
  { label: "Phiếu tạm", value: 1 },
  { label: "Đang giao hàng", value: 2 },
  { label: "Hoàn thành", value: 3 },
  { label: "Đã hủy", value: 4 },
];

const listTimeRange: ISelectOptions[] = [
  { label: "Hôm nay", value: ETimeRange.TODAY },
  { label: "Tuần này", value: ETimeRange.THIS_WEEK },
  { label: "Tháng này", value: ETimeRange.THIS_MONTH },
  { label: "Năm này", value: ETimeRange.THIS_YEAR },
];

const Orders = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);

  const [filtered, setFiltered] = useState<IOrderRequest>({
    pageSize: 25,
    currentItem: 0,
    toDate: new Date().toISOString(),
    lastModifiedFrom: new Date(new Date().getFullYear(), 0, 0).toISOString(),
    orderBy: "modifiedDate",
    orderDirection: "DESC",
    status: [],
  });

  const handleGetOrders = () => {
    orderService.getListOrder(filtered).then((res) => {
      if (res) {
        setTotal(res?.total);
        setOrders(res.data);
      }
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });
  };

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
            0
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
      console.log("debounced setCurrentItem: ", index);
      setFiltered({ ...filtered, currentItem: index });
    }, 500),
    [filtered]
  );

  useEffect(() => {
    setLoading(true);
    handleGetOrders();
  }, [filtered]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">Danh sách đơn hàng</div>
        <div className="page-header-actions">
          <div className="add-action">
            <Button variant="contained">Tạo đơn hàng mới</Button>
          </div>
        </div>
      </div>
      <div className="page-contents">
        <div className="Orders">
          <div className="Orders__filter">
            <div className="Orders__filter-item">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                disabled={loading}
                variant="outlined"
                size="small"
                onChange={(e) => handleInputSearchText(e.target.value)}
              />
            </div>
            <div className="Orders__filter-item">
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
            <div className="Orders__filter-item">
              <TextField
                id="outlined-select-currency"
                select
                label="Thời gian"
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
              columns={orderColumns}
              rows={orders}
              setSelection={setSelectedOrders}
              className="Customer__table"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
