const express = require("express");
const {
  createOrder,
  getOrderByTable,
  updateOrderStatus,
} = require("../controllers/orderController");
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Sipariş oluşturma
router.post("/", authMiddleware, authorize(['admin', 'waiter']), createOrder);

// Belirli bir masanın siparişlerini getirme
router.get("/table/:tableId", authMiddleware, authorize(['admin', 'waiter']), getOrderByTable);

// Sipariş durumunu güncelleme
router.put("/:orderId", authMiddleware, authorize(['admin', 'waiter']), updateOrderStatus);

module.exports = router;
