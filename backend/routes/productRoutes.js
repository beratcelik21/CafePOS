const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Tüm ürünleri listeleme - bu genellikle herkes tarafından erişilebilir olabilir, ancak kimlik doğrulama eklenebilir.
router.get("/", getAllProducts);

// Ürün oluşturma - sadece admin rolüne sahip kullanıcılar yapabilir.
router.post("/", authMiddleware, authorize('admin'), createProduct);

// Belirli bir ürünü ID ile getirme - kimlik doğrulama eklenebilir, ama genellikle herkese açık olabilir.
router.get("/:id", getProductById);

// Ürün güncelleme - sadece admin rolüne sahip kullanıcılar yapabilir.
router.put("/:id", authMiddleware, authorize('admin'), updateProduct);

// Ürün silme - sadece admin rolüne sahip kullanıcılar yapabilir.
router.delete("/:id", authMiddleware, authorize('admin'), deleteProduct);

module.exports = router;
