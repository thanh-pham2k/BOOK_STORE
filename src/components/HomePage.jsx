//rafce -> shorcut
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { domain } from "../env";
import { Link } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";

export const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [categoris, setCategoris] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      Axios({
        method: "get",
        url: `${domain}/api/product/`,
      }).then((response) => {
        console.log(response.data);
        setProducts(response.data);
      });
    };
    getdata();
  }, []);

  const nextProducts = async () => {
    await Axios({
      method: "get",
      url: products?.next,
    }).then((response) => {
      setProducts(response.data);
    });
  };

  const previousProducts = async () => {
    await Axios({
      method: "get",
      url: products?.previous,
    }).then((response) => {
      setProducts(response.data);
    });
  };

  useEffect(() => {
    const getcategory = async () => {
      await Axios({
        method: "get",
        url: `${domain}/api/category/`,
      }).then((response) => {
        setCategoris(response.data);
      });
    };
    getcategory();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            {products !== null &&
              products?.results.map((item, i) => (
                <div key={i} className="col-md-4  my-3">
                  <SingleProduct item={item} />
                </div>
              ))}
            <div className="home__pagination">
              <div>
                {products?.previous !== null ? (
                  <button onClick={previousProducts} className="btn btn-danger">
                    Previous
                  </button>
                ) : (
                  <button className="btn btn-danger" disabled>
                    Previous
                  </button>
                )}
              </div>
              <div>
                {products?.next !== null ? (
                  <button onClick={nextProducts} className="btn btn-success">
                    Next
                  </button>
                ) : (
                  <button className="btn btn-success" disabled>
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <h1>All Category</h1>
            {categoris?.map((cata, i) => (
              <div className="p-2 m-2" key={i}>
                <Link to={`/category/${cata.id}`} className="btn btn-success">
                  {cata.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
