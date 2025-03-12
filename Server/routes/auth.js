const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { generateToken } = require('../middlewares/authJWT');

const router = express.Router();

/** ✅ 用户注册（不包含 OTP 逻辑） */
router.post('/register', async (req, res) => {
    const { email, password, role_id } = req.body;

    try {
        const [existingUsers] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // 如果 `role_id` 为空，默认是 Customer (4)
        const assignedRole = role_id || 4;

        await db.execute(
            'INSERT INTO Users (email, password_hash, role_id) VALUES (?, ?, ?)',
            [email, hashedPassword, assignedRole]
        );

        res.status(201).json({ message: 'User registered successfully with role ID: ' + assignedRole });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/** ✅ 用户登录（不再需要 OTP） */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 🚀 直接查找用户信息
        const [users] = await db.execute('SELECT id, email, role_id, password_hash FROM Users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // 🔹 生成 JWT Token
        const tokenJWT = generateToken({ id: user.id, email, role_id: user.role_id });

        // ✅ 直接返回 `token` 和 `role_id`
        res.json({
            message: "Login successful!",
            token: tokenJWT,
            role_id: user.role_id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
