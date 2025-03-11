const express = require('express'); // Pull the express library
const bcrypt = require('bcryptjs'); // Get the app for that
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const db = require('../models/db'); 
const { generateToken } = require('../middlewares/authJWT'); // 生成 JWT 令牌
const router = express.Router();

/** 用户注册（自动生成 TOTP 秘钥） */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [existingUsers] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (existingUsers.length > 0) return res.status(400).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);

        // 生成 TOTP 秘钥
        const secret = speakeasy.generateSecret({ length: 20 });

        // 存入数据库
        await db.execute('INSERT INTO Users (email, password_hash, totp_secret) VALUES (?, ?, ?)', 
            [email, hashedPassword, secret.base32]);

        res.status(201).json({ message: 'User registered successfully', secret: secret.otpauth_url });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/** 登录（先检查密码，再要求输入 OTP） */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM Users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = users[0];

        // 验证密码
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // 需要用户输入 OTP
        res.json({ message: "Enter OTP", email });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/** 验证 OTP */
router.post('/verify-2fa', async (req, res) => {
    const { email, token } = req.body;

    try {
        const [users] = await db.execute('SELECT totp_secret FROM Users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(404).json({ message: 'User not found' });

        const verified = speakeasy.totp.verify({
            secret: users[0].totp_secret,
            encoding: 'base32',
            token: token
        });

        if (!verified) return res.status(401).json({ message: 'Invalid OTP' });

        // OTP 通过，生成 JWT
        const token = generateToken(users[0]);
        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
