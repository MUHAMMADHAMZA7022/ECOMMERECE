import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import "./header.css";
import { useSelector } from "react-redux";
import UserOptions from "../../user/useroption";

//creating the unique header component for all vasl pages
function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <ul className="dp-box1">
        <li>
          <Link
            to="/cart"
            style={{ color: cartItems.length > 0 ? "red" : "unset" }}
          >
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "red" : "unset" }}
            />{" "}
            <sup style={{ color: cartItems.length > 0 ? "red" : "unset" }}>
              {" "}
              {cartItems.length > 0 ? cartItems.length : null}
            </sup>
            Cart
          </Link>
        </li>
      </ul>
      <div className="logo">
        <h1>
          <Link to="/">
            <img className="main_logo" src={logo} alt="logo" />
          </Link>
        </h1>
      </div>
      <ul className="dp-box">
        <li>
          {isAuthenticated ? (
            <UserOptions user={user} />
          ) : (
            <Link to="/login">
              <HowToRegIcon />
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
