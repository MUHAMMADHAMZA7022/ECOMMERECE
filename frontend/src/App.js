import "./App.css";
import WebFont from "webfontloader";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from "react-router-dom";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Products/ProductDetails";
import Product from "./components/Products/product";
import Search from "./components/Products/Search";
import loginsugnup from "./components/user/loginsugnup";
import store from "./redux/store";
import { loadUser } from "./redux/action/useraction";
import ProtectedRoute from "./components/Route/ProtectedRoute";
//import { useSelector } from "react-redux";
//import UserOptions from "./components/user/useroption.js";
import Header from "./components/Layout/header/header";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/updatepassword";
import ForgotPassword from "./components/user/forgotpassword";
import ResetPassword from "./components/user/resetpassword";
import loader from "./components/Layout/Loader/Loader";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import "./components/Admin/dashboard.css";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import updateProduct from "./components/Admin/UpdateProduct";
import NewProduct from "./components/Admin/NewProduct";
import ProductReviews from "./components/Admin/ProductReviews";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
function App() {
  // const { user, isAuthenticated } = useSelector((state) => state.user);

  let history = useHistory();
  useEffect(() => {
    //ye font load krny k liye ha font use krna
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Router history={history}>
        <Header />
        <Switch>
          {/* {isAuthenticated && <UserOptions user={user} />} */}
          <Route exact path="/" component={Home} />
          <Route exact path="/loader" component={loader} />
          <Route exact path="/oneproduct/:id" component={ProductDetails} />
          <Route exact path="/products" component={Product} />
          <Route path="/products/:keyword" component={Product} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={loginsugnup} />
          <ProtectedRoute exact path="/accounts" component={Profile} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/process/payment" component={Payment} />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />
          <ProtectedRoute exact path="/orders" component={MyOrders} />
          {/* ADMIN_ROUTE */}
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          {/* ADMIN_ROUTE */}
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/products"
            component={ProductList}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product"
            component={NewProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/product/:id"
            component={updateProduct}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/order/:id"
            component={ProcessOrder}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/orders"
            component={OrderList}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
          />

          <ProtectedRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/reviews"
            component={ProductReviews}
          />
          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />

          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            exact
            path="/profile/update"
            component={UpdateProfile}
          />
          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <Route exact path="/forgot_password" component={ForgotPassword} />

          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />
        </Switch>

        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
