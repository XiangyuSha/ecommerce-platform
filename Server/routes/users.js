const express = require('express');
const db = require('../models/db');
const { verifyToken } = require('../middlewares/authJWT');
const { authorizeRoles } = require('../middlewares/authoRBAC');

const router = express.Router();

// 创建用户（仅 SuperAdmin & Admin）
router.post('/', verifyToken, authorizeRoles('SuperAdmin', 'Admin'), async (req, res) => {
    const { email, password, role } = req.body;
    try {
        await db.execute('INSERT INTO Users (email, password_hash, role) VALUES (?, ?, ?)', 
            [email, password, role]);
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 获取所有用户（仅 Admin）
router.get('/', verifyToken, authorizeRoles('Admin'), async (req, res) => {
    try {
        const [users] = await db.execute('SELECT * FROM Users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 更新用户（仅 Admin）
router.put('/:id', verifyToken, authorizeRoles('Admin'), async (req, res) => {
    const { role } = req.body;
    try {
        await db.execute('UPDATE Users SET role = ? WHERE id = ?', [role, req.params.id]);
        res.json({ message: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 删除用户（仅 SuperAdmin）
router.delete('/:id', verifyToken, authorizeRoles('SuperAdmin'), async (req, res) => {
    try {
        await db.execute('DELETE FROM Users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
