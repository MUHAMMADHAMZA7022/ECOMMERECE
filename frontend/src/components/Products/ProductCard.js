import { Rating } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";
import "../Layout/Loader/imageload.css";
import { Fragment } from "react";
import { useState } from "react";
// import Imageload from "../Layout/Loader/imageload";
import Loader1 from "../Layout/Loader/loader1";
export const Product = ({ product }) => {
  const [loaded, setLoaded] = useState(false);

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  setTimeout(() => {
    setLoaded(true);
  }, 1000);

  return (
    <Fragment>
      {loaded ? (
        <Link className="productCard" to={`/oneproduct/${product._id}`}>
          <>
            <div className="productCard">
              <img alt={product.name} src={product.images[0].url} />

              <p>{product.name}</p>
            </div>
            <div>
              <Rating {...options} />{" "}
              <span className="productCardSpan">
                ({product.numofreviews} Reviews)
              </span>
            </div>
            <span>{`PKR ${product.price}`}</span>
          </>
        </Link>
      ) : (
        <>
          {/* <Imageload /> */}
          <Loader1 />
        </>
      )}
    </Fragment>
  );
};
export default Product;
