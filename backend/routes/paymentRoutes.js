const express = require("express");
const {
  createPayment,
  getPaymentsByTable,
  updatePaymentStatus,
} = require("../controllers/paymentController");
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Ödeme oluşturma - admin ve waiter rolüne sahip kullanıcılar tarafından yapılabilir.
router.post("/", authMiddleware, authorize(['admin', 'waiter']), createPayment);

// Belirli bir masanın ödeme bilgilerini getirme - admin ve waiter rolüne sahip kullanıcılar tarafından erişilebilir.
router.get("/table/:tableId", authMiddleware, authorize(['admin', 'waiter']), getPaymentsByTable);

// Ödeme durumunu güncelleme - admin ve waiter rolüne sahip kullanıcılar tarafından yapılabilir.
router.put("/:paymentId/status", authMiddleware, authorize(['admin', 'waiter']), updatePaymentStatus);

module.exports = router;
