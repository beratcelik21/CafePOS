const Table = require("../models/Table");

exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const { name } = req.body;
    const table = await Table.create({ name });
    res.status(201).json(table);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findByPk(re.params.id);
    if (!table) {
      return res.status(404).json({ error: "table not found" });
    }
    res.json(table);
  } catch (err) {
    res.status(500), json({ error: err.message });
  }
};
