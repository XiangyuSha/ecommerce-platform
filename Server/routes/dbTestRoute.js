const express = require('express');
const router = express.Router();
const pool = require('../models/db');

router.get('/check-db', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        res.json({ success: true, message: 'Connect database successfully!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to connect database', error: error.message });
    }
});

router.get('./test', (req, res) => {
    res.json({ message: 'JWT is valid! This is a protected router. ', user: req.user })
})

module.exports = router;
