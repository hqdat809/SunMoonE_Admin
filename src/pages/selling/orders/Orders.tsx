import React, { useEffect, useState } from "react";
import * as orderService from "../../../services/order-service";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { ETimeRange, ISelectOptions } from "../../../interfaces/common";
import "./Orders.scss";
import { IOrder } from "../../../interfaces/order-interface";
import Table from "../../../components/table/Table";
import { orderColumns } from "../../../components/table/table-data";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [total, setTotal] = useState<number | undefined>(0);
  const [status, setStatus] = useState<number>();
  const [timeRange, setTimeRange] = useState<ETimeRange | string>(
    ETimeRange.THIS_YEAR
  );
  const [filteredOrders, setFilteredOrders] = useState<IOrder[] | undefined>(
    undefined
  );
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);

  const handleGetOrders = () => {
    console.log(new Date().toISOString);
    orderService
      .getListOrder({
        status: status ? [status] : [],
        orderBy: "createdDate",
        orderDirection: "DESC",
        pageSize: 200,
        currentItem: currentItem,
        toDate: new Date().toISOString(),
        lastModifiedFrom: new Date(
          new Date().getFullYear(),
          1,
          1
        ).toISOString(),
      })
      .then((res) => {
        if (res && orders) {
          const newData = [...orders, ...res.data];
          setOrders(newData);
          setTotal(res?.total);
          setCurrentItem(currentItem + 200);
          if (currentItem >= res.total - 200) {
            setTimeout(() => {
              setLoading(false);
            }, 700);
          }
        }
      });
  };

  const renderProduct = () => {
    if (filteredOrders === undefined) {
      return orders;
    } else if (filteredOrders && filteredOrders.length === 0) {
      return filteredOrders;
    } else {
      return filteredOrders;
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      setLoading(false);
      let newData: IOrder[] = [];
      newData = orders;

      // filter status field
      if (status !== undefined) {
        const filteredData = newData.filter((p) => p.status === status);
        newData = filteredData;
      } else {
        newData = orders;
      }

      // filter time range field
      if (timeRange) {
        switch (timeRange) {
          case ETimeRange.TODAY: {
            const today = new Date();
            const todayString = today.toISOString().split("T")[0];
            const filteredData = newData.filter((p) =>
              p.createdDate?.startsWith(todayString)
            );
            newData = filteredData;
            break;
          }
          case ETimeRange.THIS_WEEK: {
            const today = new Date();

            // Tính ngày đầu tuần (Thứ Hai) và ngày cuối tuần (Chủ Nhật)
            const firstDayOfWeek = new Date(today);
            firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Thứ Hai
            firstDayOfWeek.setHours(0, 0, 0, 0); // Đặt về 00:00:00

            const lastDayOfWeek = new Date(today);
            lastDayOfWeek.setDate(today.getDate() - today.getDay() + 7); // Chủ Nhật
            lastDayOfWeek.setHours(23, 59, 59, 999); // Đặt về 23:59:59

            const filteredData = newData.filter((item) => {
              const date = new Date(item.createdDate);
              return date >= firstDayOfWeek && date <= lastDayOfWeek;
            });
            newData = filteredData;
            break;
          }
          case ETimeRange.THIS_MONTH: {
            const today = new Date();
            const currentMonth = today.getMonth(); // Tháng (0-11)
            const currentYear = today.getFullYear(); // Năm

            const filteredData = newData.filter((item) => {
              const date = new Date(item.createdDate);
              return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
              );
            });
            newData = filteredData;
            break;
          }
          case ETimeRange.THIS_YEAR: {
            const today = new Date();
            const currentYear = today.getFullYear(); // Năm

            const filteredData = newData.filter((item) => {
              const date = new Date(item.createdDate);
              return date.getFullYear() === currentYear;
            });
            newData = filteredData;
            break;
          }
        }
      }

      setFilteredOrders(newData);
      setTotal(newData.length);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [status, timeRange]);

  useEffect(() => {
    if (total && currentItem < total && currentItem > 0) {
      handleGetOrders();
    }
  }, [orders]);

  useEffect(() => {
    setLoading(true);
    handleGetOrders();
  }, []);

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
                // onChange={(e) => handleInputSearchText(e.target.value)}
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
                  setCurrentItem(0);
                  if (event.target.value !== "default") {
                    setStatus(parseInt(event.target.value));
                  } else {
                    setStatus(undefined);
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
                  setTimeRange(event.target.value);
                  setCurrentItem(0);
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
              isLoading={loading}
              total={total}
              pageSize={25}
              columns={orderColumns}
              rows={renderProduct()}
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
