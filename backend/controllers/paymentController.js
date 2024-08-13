const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
    try {
        const { orderId, tableId, amount, method } = req.body;
        const payment = await Payment.create({ orderId, tableId, amount, method });
        res.status(201).json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPaymentsByTable = async (req, res) => {
    try {
        const { tableId } = req.params;
        const payments = await Payment.findAll({ where: { tableId } });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status } = req.body;

        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        payment.status = status;
        await payment.save();
        res.json(payment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
