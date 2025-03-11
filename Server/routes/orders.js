const express = require('express');
const db = require('../models/db');
const { verifyToken } = require('../middlewares/authJWT');
const { authorizeRoles } = require('../middlewares/authRBAC');

const router = express.Router();

// 创建订单（仅 Customer）
router.post('/', verifyToken, authorizeRoles('Customer'), async (req, res) => {
    const { product_id, quantity } = req.body;
    try {
        await db.execute('INSERT INTO Orders (product_id, quantity, customer_id) VALUES (?, ?, ?)', 
            [product_id, quantity, req.user.id]);
        res.status(201).json({ message: 'Order placed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 获取订单（Customer 只能查看自己的，Staff 和 Admin 可以查看所有）
router.get('/', verifyToken, async (req, res) => {
    try {
        let query = 'SELECT * FROM Orders';
        let params = [];

        if (req.user.role === 'Customer') {
            query += ' WHERE customer_id = ?';
            params.push(req.user.id);
        }

        const [orders] = await db.execute(query, params);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 更新订单状态（仅 Staff）
router.put('/:id', verifyToken, authorizeRoles('Staff'), async (req, res) => {
    const { status } = req.body;
    try {
        await db.execute('UPDATE Orders SET status = ? WHERE id = ?', 
            [status, req.params.id]);
        res.json({ message: 'Order status updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 取消订单（仅 Admin）
router.delete('/:id', verifyToken, authorizeRoles('Admin'), async (req, res) => {
    try {
        await db.execute('DELETE FROM Orders WHERE id = ?', [req.params.id]);
        res.json({ message: 'Order canceled' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
