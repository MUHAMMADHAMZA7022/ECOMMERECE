import { combineReducers } from "redux";
import {
  productsReducer,
  productDetailsReducer,
  productReducer,
  newProductReducer,
  newReviewReducer,
  productReviewsReducer,
  reviewReducer,
} from "./productReducer";
import {
  newOrderReducer,
  myOrdersReducer,
  orderReducer,
  orderDetailsReducer,
  allOrdersReducer,
} from "./orderReducer";
import {
  allUsersReducer,
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  userDetailsReducer,
} from "./userreducer";
import { cartReducer } from "./cartReducer";

const AllReducer = combineReducers({
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  products: productsReducer,
  userDetails: userDetailsReducer,
  productDetails: productDetailsReducer,
  product: productReducer,
  newProduct: newProductReducer,
  newReview: newReviewReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  allUsers: allUsersReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
});

export default AllReducer;
