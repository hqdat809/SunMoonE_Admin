import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import {
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import "./Customers.scss";
import { useEffect, useState } from "react";
import * as customerService from "../../services/customer-service";
import { ICustomer } from "../../interfaces/customer-interface";
import { customerColumns } from "../../components/table/table-data";
import Table from "../../components/table/Table";
const listRank = [
  {
    value: "default",
    label: "---none---",
  },
  {
    value: "customer",
    label: "Thành viên",
  },
  {
    value: "silver",
    label: "Bạc",
  },
  {
    value: "gold",
    label: "Vàng",
  },
  {
    value: "diamond",
    label: "Kim",
  },
];

const listCreatedDate = [
  {
    value: "default",
    label: "---none---",
  },
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "yesterday",
    label: "Hôm qua",
  },
  {
    value: "thisWeek",
    label: "Tuần này",
  },
  {
    value: "lastWeek",
    label: "Tuần trước",
  },
  {
    value: "7daysLasted",
    label: "7 ngày gần đây",
  },
  {
    value: "30daysLasted",
    label: "30 ngày gần đây",
  },
  {
    value: "thisMonth",
    label: "Tháng này",
  },
  {
    value: "lastMonth",
    label: "Tháng trước",
  },
];

const listPrice = [
  {
    value: "default",
    label: "---none---",
  },
  {
    value: "ctv",
    label: "Bảng giá CTV",
  },
  {
    value: "ctv1",
    label: "Bảng giá CTV1",
  },
  {
    value: "ctv2",
    label: "Bảng giá CTV2",
  },
  {
    value: "ctv3",
    label: "Bảng giá CTV3",
  },
  {
    value: "ctv4",
    label: "Bảng giá CTV4",
  },
];

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState(0);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<ICustomer[]>();
  const [currentItem, setCurrentItem] = useState(0);

  const handleGetCustomer = () => {
    customerService
      .getCustomerFromKiot({ pageSize: 200, currentItem: currentItem })
      .then((res) => {
        if (res) {
          const newData = [...customers, ...res.data];
          console.log("res api data: ", res);
          setCustomers(newData);
          setTotal(res.total);
          setCurrentItem(currentItem + 200);
          if (currentItem >= res.total - 200) {
            setLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    if (total && currentItem < total && currentItem > 0) {
      handleGetCustomer();
    }
  }, [customers]);

  useEffect(() => {
    setLoading(true);
    handleGetCustomer();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title"> Danh sách khách hàng</div>
      </div>
      <div className="page-contents">
        {loading && (
          <div className="layout-loading">
            <CircularProgress size="3rem" />
          </div>
        )}
        <div className="Customer">
          <div className="">
            <Table
              total={total}
              pageSize={25}
              columns={customerColumns}
              rows={customers}
              setSelection={setSelectedCustomer}
              className="Customer__table"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
