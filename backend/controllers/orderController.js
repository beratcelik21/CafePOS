const Order = require("..models/order");
const Table = require("..models/table");
const Product = require("..models/product");

exports.createOrder = async (req, res) => {
  try {
    const { tableId, productId, quantity } = req.body;
    const table = await Table.findByPk(tableId);
    const product = await Product.findByPk(productId);

    if (!table || !product) {
      return res.status(404).json({ error: "Table or Product not found" });
    }
    const order = await Order.create({ tableId, productId, quantity });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
