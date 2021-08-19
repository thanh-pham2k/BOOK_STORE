import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domain } from "../env";
import SingleProduct from "../components/SingleProduct";

const ProductDetails = () => {
  const { id } = useParams();
  //Sử dụng để hiển thị id
  const [product, setProduct] = useState(null);
  const [categoryproducts, setCategoryproducts] = useState(null);

  console.log(product?.category["id"]);
  useEffect(() => {
    const getdata = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/product/${id}/`,
      }).then((response) => {
        console.log(response.data);
        setProduct(response.data);
        getcategory(response?.data?.category["id"]);
      });
    };
    getdata();
  }, [id]);

  const getcategory = async (id) => {
    await Axios({
      method: "get",
      url: `${domain}/api/category/${id}/`,
    }).then((response) => {
      console.log(response.data);
      setCategoryproducts(response.data);
    });
  };

  return (
    <div className="container">
      {product !== null && (
        <div className="row">
          <img src={product?.image} />
          <div className="div col-md-7">
            <h1>{product?.title}</h1>
            <h2>
              Price:<del>{product.market_price}</del> {product.selling_price}
            </h2>
          </div>

          <div className="div col-md-4">
            <button className="btn btn-info">Add to Cart</button>
          </div>
          <p>{product?.description}</p>
        </div>
      )}
      <div className="row">
        <h1>Related Products</h1>
        {categoryproducts !== null &&
          categoryproducts[0]?.category_products?.map((product, i) => (
            <div className="col-md-3" key={i}>
              <SingleProduct item={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;
