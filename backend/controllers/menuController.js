const Menu = require('../models/Menu');
const Product = require('../models/Product');

exports.getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll({ include: 'products' });
        res.json(menus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createMenu = async (req, res) => {
    try {
        const { name, description } = req.body;
        const menu = await Menu.create({ name, description });
        res.status(201).json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addProductToMenu = async (req, res) => {
    try {
        const { menuId, productId } = req.body;
        const menu = await Menu.findByPk(menuId);
        const product = await Product.findByPk(productId);

        if (!menu || !product) {
            return res.status(404).json({ error: 'Menu or product not found' });
        }

        await menu.addProduct(product);
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
