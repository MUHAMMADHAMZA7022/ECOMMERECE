import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "../Products/ProductCard";
import MetaData from "../Layout/Metadata";
import { CLEAR_Errors, getProduct } from "../../redux/action/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "./../Layout/Loader/Loader";
import TypeWriterEffect from "react-typewriter-effect";
import { Link } from "react-router-dom";
import Loaderr from "../Layout/Loader/Loader";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);

      dispatch(CLEAR_Errors);
    }
    dispatch(getProduct());
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loaderr />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <TypeWriterEffect
              textStyle={{ fontFamily: "Red Hat Display" }}
              startDelay={100}
              cursorColor="white"
              text="WELLCOME TO VASAL CLOTHINGS"
              typeSpeed={100}
            />

            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <Link to="/products">
            <form className="searchBox">
              <input type="button" value="Products"></input>
            </form>
          </Link>
          <Link to="/search">
            <form className="searchBox">
              <input type="button" value="Search"></input>
            </form>
          </Link>
          <Link to="/login">
            <form className="searchBox">
              <input type="button" value="Authetication"></input>
            </form>
          </Link>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products ? (
              products.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })
            ) : (
              <Loader />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
