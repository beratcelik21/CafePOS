const express = require("express");
const {
  getAllMenus,
  createMenu,
  ddProductToMenu,
  addProductToMenu,
} = require("../controllers/menuController");
const router = express.Router();

router.get("/", getAllMenus);
router.post("/", createMenu);
router.post("/add-product", addProductToMenu);

module.exports = router;
