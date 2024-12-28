import {
  TextField
} from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { customerColumns } from "../../components/table/table-data";
import {
  ICustomer,
  ICustomerRequest,
} from "../../interfaces/customer-interface";
import * as customerService from "../../services/customer-service";
import "./Customers.scss";

const Customers = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [filtered, setFiltered] = useState<ICustomerRequest>({
    pageSize: 20,
    currentItem: 0,
    orderBy: "createdDate",
    orderDirection: "DESC",
  });

  const handleNameSearch = (values: string) => {
    debouncedNamefilter(values);
  };

  const handlePhoneSearch = (values: string) => {
    debouncedPhonefilter(values);
  };

  const debouncedNamefilter = useCallback(
    _.debounce(
      (values) => setFiltered({ ...filtered, currentItem: 0, name: values }),
      1000
    ), // 500ms debounce
    [filtered]
  );

  const debouncedPhonefilter = useCallback(
    _.debounce(
      (values) =>
        setFiltered({ ...filtered, currentItem: 0, contactNumber: values }),
      1000
    ), // 500ms debounce
    [filtered]
  );

  const handleGetCustomer = () => {
    customerService.getCustomerFromKiot(filtered).then((res) => {
      if (res) {
        setCustomers(res.data);
        setTotal(res.total);
      }
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });
  };

  const handleSetCurrentItem = useCallback(
    _.debounce((index) => {
      setFiltered({ ...filtered, currentItem: index });
    }, 500),
    [filtered]
  );

  useEffect(() => {
    setLoading(true);
    handleGetCustomer();
  }, [filtered]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title"> Danh sách khách hàng</div>
      </div>
      <div className="page-contents">
        <div className="Customer">
          <div className="Customer__filter">
            <div className="Customer__filter-item">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm theo tên"
                variant="outlined"
                disabled={loading}
                size="small"
                onChange={(e) => handleNameSearch(e.target.value)}
              />
            </div>
            <div className="Customer__filter-item">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm theo sđt"
                variant="outlined"
                disabled={loading}
                size="small"
                onChange={(e) => handlePhoneSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <Table
              currentItem={filtered.currentItem}
              isLoading={loading}
              total={total}
              pageSize={filtered.pageSize}
              handleSetCurrentItem={handleSetCurrentItem}
              columns={customerColumns}
              rows={customers}
              className="DataTable"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
