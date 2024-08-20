const express = require("express");
const {
  getAllMenus,
  createMenu,
  addProductToMenu,
} = require("../controllers/menuController");
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Tüm menüleri getirme - bu genellikle herkese açık olabilir, bu yüzden authMiddleware eklenmez.
router.get("/", getAllMenus);

// Menü oluşturma - sadece admin yetkisine sahip kullanıcılar yapabilir.
router.post("/", authMiddleware, authorize('admin'), createMenu);

// Menüye ürün ekleme - sadece admin yetkisine sahip kullanıcılar yapabilir.
router.post("/add-product", authMiddleware, authorize('admin'), addProductToMenu);

module.exports = router;
