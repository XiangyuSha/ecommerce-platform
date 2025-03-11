const express = require('express');
const db = require('../models/db');
const { verifyToken } = require('../middlewares/authJWT');
const { authorizeRoles } = require('../middlewares/authRBAC');

const router = express.Router();

// 添加产品（仅 Staff）
router.post('/', verifyToken, authorizeRoles('Staff'), async (req, res) => {
    const { name, price, quantity } = req.body;
    try {
        await db.execute('INSERT INTO Products (name, price, quantity) VALUES (?, ?, ?)', 
            [name, price, quantity]);
        res.status(201).json({ message: 'Product added' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 获取所有产品（所有用户）
router.get('/', verifyToken, async (req, res) => {
    try {
        // await 等待查询结果，然后再执行下一步代码 
        // Deconstruct the assignment and get the query result directly
        const [products] = await db.execute('SELECT * FROM Products'); 
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 更新产品（仅 Staff）
router.put('/:id', verifyToken, authorizeRoles('Staff'), async (req, res) => {
    const { price, quantity } = req.body;
    try {
        await db.execute('UPDATE Products SET price = ?, quantity = ? WHERE id = ?', 
            [price, quantity, req.params.id]);
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 删除产品（仅 Admin）
router.delete('/:id', verifyToken, authorizeRoles('Admin'), async (req, res) => {
    try {
        await db.execute('DELETE FROM Products WHERE id = ?', [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
