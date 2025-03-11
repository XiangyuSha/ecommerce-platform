const express = require('express');
const bcrypt = require('bcryptjs');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { generateToken } = require('../middlewares/authJWT');

const router = express.Router();

/** 用户注册（自动生成 TOTP 秘钥） */
router.post('/register', async (req, res) => {
    const { email, password, role_id = 4 } = req.body; // ✅ 默认 role_id = 4（Customer）

    try {
        // 1️⃣ 检查 email 是否已存在
        const [existingUsers] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // 2️⃣ 确保 `role_id` 在 `Roles` 表中
        const [roles] = await db.execute("SELECT id FROM Roles WHERE id = ?", [role_id]);
        if (roles.length === 0) {
            return res.status(400).json({ message: "Invalid role_id" });
        }

        // 3️⃣ 哈希密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4️⃣ 生成 TOTP 秘钥
        const secret = speakeasy.generateSecret({ length: 20 });

        // 5️⃣ 存入数据库
        await db.execute(
            'INSERT INTO Users (email, password_hash, totp_secret, role_id) VALUES (?, ?, ?, ?)', 
            [email, hashedPassword, secret.base32, role_id]
        );

        res.status(201).json({ message: 'User registered successfully', secret: secret.otpauth_url });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/** 登录（后端返回 TOTP 验证所需的信息） */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute('SELECT id, email, role_id, password_hash, totp_secret FROM Users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = users[0];

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // ✅ 返回 OTP 验证所需信息
        res.json({ message: "Enter OTP", email, secret: user.totp_secret });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/** **✅ 修正 TOTP 验证** */
router.post('/verify-2fa', async (req, res) => {
    const { email, token } = req.body;

    try {
        // ✅ 读取 `totp_secret`
        const [users] = await db.execute('SELECT id, role_id, totp_secret FROM Users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const user = users[0];

        // 验证 OTP
        const verified = speakeasy.totp.verify({
            secret: user.totp_secret, // ✅ 确保正确读取 `totp_secret`
            encoding: 'base32',
            token: token
        });

        if (!verified) return res.status(401).json({ message: 'Invalid OTP' });

        // OTP 通过，生成 JWT
        const token = generateToken(user);
        res.json({ token, role_id: user.role_id });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
