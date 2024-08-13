const Table = require('../models/Table');

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
        res.status(500).json({ error: err.message });
    }
};

exports.getTableById = async (req, res) => {
    try {
        const table = await Table.findByPk(req.params.id);
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }
        res.json(table);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTableStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const table = await Table.findByPk(id);
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        table.status = status;
        await table.save();
        res.json(table);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTable = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await Table.findByPk(id);
        if (!table) {
            return res.status(404).json({ error: 'Table not found' });
        }

        await table.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
