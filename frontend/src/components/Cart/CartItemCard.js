import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: PKR${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>
          <DeleteForeverRoundedIcon />
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
