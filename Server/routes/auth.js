const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { executeQuery } = require('../models/db');
const { generateToken } = require('../middlewares/authJWT');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { email, password, role_id } = req.body;

    try {
        const [existingUsers] = await executeQuery('SELECT * FROM Users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const assignedRole = role_id || 4;

        await executeQuery(
            'INSERT INTO Users (email, password_hash, role_id) VALUES (?, ?, ?)',
            [email, hashedPassword, assignedRole]
        );

        res.status(201).json({ message: 'User registered successfully with role ID: ' + assignedRole });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await executeQuery('SELECT id, email, role_id, password_hash FROM Users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // JWT Token
        const tokenJWT = generateToken({ id: user.id, email, role_id: user.role_id });

        // return `token` 和 `role_id`
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
