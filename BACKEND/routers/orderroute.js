const express = require("express");
const router = express.Router();
const {
    neworder, getsingleorder, getmyorder, getallorder, updateorder, deleteorder
} = require("../controllers/ordercontroller")

const authenticate = require("../middleware/auth");


router.route("/order/new").post(authenticate, neworder)
router.route("/order/:id").get(authenticate, getsingleorder)
router.route("/orders/me").get(authenticate, getmyorder)
router.route("/admin/orders").get(authenticate, authorizerole("admin"), getallorder)
router.route("/admin/order/:id")
    .put(authenticate, authorizerole("admin"), updateorder)
    .delete(authenticate, authorizerole("admin"), deleteorder)
module.exports = router;
