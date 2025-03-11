const express = require('express');
const { verifyToken } = require('../middlewares/authJWT'); 
const { authorizeRoles } = require('../middlewares/authorization');

const router = express.Router();

// 浏览产品（所有用户都可以）
router.get('/browse-products', verifyToken, (req, res) => {
    res.json({ message: 'Product list' });
});

// 发送 RFQ（仅 Customer）
router.post('/send-rfq', verifyToken, authorizeRoles('Customer'), (req, res) => {
    res.json({ message: 'RFQ sent successfully' });
});

// 发送 PO（仅 Customer）
router.post('/send-po', verifyToken, authorizeRoles('Customer'), (req, res) => {
    res.json({ message: 'PO sent successfully' });
});

module.exports = router;