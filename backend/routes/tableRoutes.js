const express = require("express");
const {
  getAllTables,
  createTable,
  getTableById,
  updateTableStatus,
  deleteTable,
} = require("../controllers/tableController");
const router = express.Router();

router.get("/", getAllTables);
router.post("/", createTable);
router.get("/:id", getTableById);
router.put("/:id/status", updateTableStatus);
router.delete("/:id", deleteTable);

module.exports = router;
