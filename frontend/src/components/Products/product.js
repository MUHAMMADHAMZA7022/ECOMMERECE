import React, { Fragment, useEffect, useState } from "react";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_Errors, getProduct } from "../../redux/action/productAction";
//import Loader from "../Layout/Loader/Loader";
import ProductCard from "./ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../Layout/Metadata";
import { useParams } from "react-router-dom";
import Search from "./Search";
const cateogories = [
  "Men",
  "T-Shirt",
  "Women",
  "UnStitch",
  "Stitch",
  "Underware",
  "Mobiles",
];

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState();
  const [price, setPrice] = useState([0, 25000]);
  const [cateogery, setcateogery] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    //loading,
    error,
    productsCount,
    resultperpage,
    //filterproductCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  //let count = filterproductCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(CLEAR_Errors());
    }

    dispatch(getProduct(keyword, currentPage, price, cateogery, ratings));
  }, [dispatch, keyword, currentPage, price, cateogery, ratings, alert, error]);

  return (
    <Fragment>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <Search />
      <h2 className="productsHeading">Products</h2>

      <div className="products">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={25000}
          className="slider"
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {cateogories.map((cato) => (
            <li
              className="category-link"
              key={cato}
              onClick={() => setcateogery(cato)}
            >
              {cato}
            </li>
          ))}
        </ul>

        <fieldset>
          <Typography component="legend">Ratings Above</Typography>
          <Slider
            value={ratings}
            onChange={(e, newRating) => {
              setRatings(newRating);
            }}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
            className="slider"
          />
        </fieldset>
      </div>

      {resultperpage < productsCount && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultperpage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Products;
