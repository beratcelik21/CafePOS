const express = require("express");
const {
  createPayment,
  getPaymentsByTable,
  updatePaymentStatus,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/", createPayment);
router.get("/table/:tableId", getPaymentsByTable);
router.put("/:paymentId/status", updatePaymentStatus);

module.exports = router;
