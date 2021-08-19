import React from "react";
import { useGlobalState } from "../state/provider";
import { Link } from "react-router-dom";

const Cart = () => {
  const [{ cartuncomplit }, {}] = useGlobalState();
  let cart_product_length = 0;
  if (cartuncomplit !== null) {
    cart_product_length = cartuncomplit?.cartproduct?.length;
  } else {
    cart_product_length = 0;
  }

  return (
    <div className="container p-2">
      {cart_product_length !== 0 ? (
        <table className="table table-striped ">
          <thead>
            <th>SN</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </thead>
          <tbody>
            {cartuncomplit?.cartproduct.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.product[0].title}</td>
                <td>{data.price}</td>
                <td>{data.quantity}</td>
                <td>{data.subtotal}</td>
                <td>
                  <button className="btn btn-info">-</button>
                  <button className="btn btn-danger mx-1">X</button>
                  <button className="btn btn-danger">+</button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th colSpan="4" className="text-right">
                Total:
              </th>
              <th>{cartuncomplit?.total}</th>
              <th>
                <Link className="btn btn-success" to="/order">
                  Order Now
                </Link>
              </th>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div>
          <h1>Thare is no Card Go home and add some Product</h1>
        </div>
      )}

      <div className="row">
        <div className="col">
          <Link className="btn btn-info" to="/oldorders">
            Old Olders
          </Link>
        </div>
          {cart_product_length !== 0 && (
            <div className="col">
              <Link className="btn btn-danger" to="">
                Delete Cart
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default Cart;
