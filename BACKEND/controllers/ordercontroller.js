const Order = require("../models/ordermodel");
const Product = require("../models/productmodel");
const Errorhandler = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/asyncerror.js");
// Create new Order
exports.neworder = catchasyncerror(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});
// get Single Order
exports.getsingleorder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
exports.getmyorder = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get All Orders and total price --Admin
exports.getallorder = catchasyncerror(async (req, res, next) => {
  const orders = await Order.find();
  let totalamount = 0;
  orders.forEach((order) => {
    totalamount += order.totalPrice; //ye sarey total kr liye order kitny pesy bnty
  });
  res.status(200).json({
    success: true,
    totalamount,
    orders,
  });
});
// update order status --Admin
exports.updateorder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new Errorhandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// exports.updateorder = catchasyncerror(async (req, res, next) => {
//   const order = await Order.findById(req.params.id); //ye id do order ki jo update krna status
//   if (!order) {
//     return next(new Errorhandler("Order not found with this Id", 404));
//   }
//   if (order.orderStatus === "Delivered") {
//     //ye delivered k liye lgya agr already ha
//     return next(new Errorhandler("You have already delivered this order", 400));
//   }
//   order.orderItems.forEach(async (order) => {
//     //ye stock minus kiya ha function bnya nechy
//     await updateStock(order.product, order.quantity);
//   });
//   order.orderStatus = req.body.status; //ye hum delivered dy gy
//   if (req.body.status === "Delivered") {
//     order.deliveredAt = Date.now();
//   }
//   await order.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//     order,
//   });
// });
// async function updateStock(id, quantity) {
//   //ye update ka bntya ha function stcok wala
//   const product = await Product.findById(id);
//   product.stock -= quantity; //ye minu kr diya hum ny stock qunatity sy utna
//   await product.save({ validateBeforeSave: false });
// }

// Delete Order --Admin
exports.deleteorder = catchasyncerror(async (req, res, next) => {
  const order = await Order.findById(req.params.id); //ye id dhondi delete ki
  if (!order) {
    return next(new Errorhandler("Order not found with this Id", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
    order,
  });
});
