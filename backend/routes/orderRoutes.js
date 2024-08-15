const express = require("express");
const {
  createOrder,
  getOrderByTable,
  updateOrderStatus,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/", createOrder);
router.get("/table/:tableId, getOrderByTable");
router.put("/:orderId", updateOrderStatus);

module.exports = router;
