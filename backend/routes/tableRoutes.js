const express = require("express");
const {
  getAllTables,
  createTable,
  getTableById,
  updateTableStatus,
  deleteTable,
} = require("../controllers/tableController");
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Tüm masaları listeleme - Bu işlem genellikle herkes tarafından erişilebilir olabilir.
router.get("/", getAllTables);

// Masa oluşturma - Sadece admin rolüne sahip kullanıcılar yapabilir.
router.post("/", authMiddleware, authorize('admin'), createTable);

// Belirli bir masayı ID ile getirme - Kimlik doğrulama eklenebilir, ama genellikle herkese açık olabilir.
router.get("/:id", getTableById);

// Masa durumunu güncelleme - Sadece admin rolüne sahip kullanıcılar yapabilir.
router.put("/:id/status", authMiddleware, authorize('admin'), updateTableStatus);

// Masa silme - Sadece admin rolüne sahip kullanıcılar yapabilir.
router.delete("/:id", authMiddleware, authorize('admin'), deleteTable);

module.exports = router;
