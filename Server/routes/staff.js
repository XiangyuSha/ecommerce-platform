const express = require('express');
const { verifyToken } = require('../middlewares/authJWT'); 
const { authorizeRoles } = require('../middlewares/authorization');

const router = express.Router();

// 添加产品（仅 Staff 可操作）
router.post('/add-product', verifyToken, authorizeRoles('Staff'), (req, res) => {
    res.json({ message: 'Product added successfully' });
});

// 更新库存（仅 Staff 可操作）
router.put('/update-inventory', verifyToken, authorizeRoles('Staff'), (req, res) => {
    res.json({ message: 'Inventory updated' });
});

module.exports = router;
