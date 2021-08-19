import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { domain, header } from "../env";
const OldOrders = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getorders = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/orders/`,
        headers: header,
      }).then((response) => {
        console.log(response, "OLD OLD");
        setOrders(response.data);
      });
    };
    getorders();
  }, []);

  return (
    <div>
      <h1>Old Orders</h1>
      <table>
        <th>
          <tr>
            <th>SN</th>
            <th>Total</th>
            <th>Product</th>
            <th>Order Status</th>
            <th></th>
            <th></th>
          </tr>
        </th>
      </table>
      <tbody>
        {orders?.length !== 0 ? (
          orders?.map((order, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>TK. {order?.total}</td>
              <td>{order?.cartproduct?.length}</td>
              <td>{order?.order_status}</td>
              <td>
                <Link to={`/orderdetails/${order?.id}`} className="btn btn-success">
                  Details
                </Link>
              </td>
              <td>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <div>
            <h1 className="display-1">No Old Order</h1>
            <Link to="orderdetails" className="btn btn-info">
              {" "}
              GO HOME
            </Link>
          </div>
        )}
      </tbody>
    </div>
  );
};

export default OldOrders;
