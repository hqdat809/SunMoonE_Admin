import React, { useEffect } from "react";
import * as orderService from "../../../services/order-service";

const Orders = () => {
  useEffect(() => {
    orderService
      .getListOrder({
        status: [3],
        orderBy: "createdDate",
        orderDirection: "DESC",
        pageSize: 1000,
      })
      .then((res) => {
        console.log("Order data: ", res?.data);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-title">Đơn hàng</div>
      </div>
      <div className="page-contents">
        <h1>Hello, Orders!</h1>
        <p>This is the orders page.</p>
      </div>
    </div>
  );
};

export default Orders;
