import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/action/productAction";
import { getAllOrders } from "../../redux/action/orderaction";
import { getAllUsers } from "../../redux/action/useraction";
import MetaData from "../Layout/Metadata";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.products);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const chartData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#444"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["InStock", "Out of Stock"],
    datasets: [
      {
        backgroundColor: ["green", "red"],
        hoverBackgroundColor: ["#444", "black"],
        data: [products.length - outOfStock, outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> PKR{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Chart type="line" data={chartData} />
        </div>
        <div className="doughnutChart">
          <Chart type="doughnut" data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
