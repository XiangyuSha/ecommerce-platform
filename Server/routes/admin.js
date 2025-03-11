const express = require('express');
const { verifyToken } = require('../middlewares/authJWT'); 
const { authorizeRoles } = require('../middlewares/authRBAC');

const router = express.Router();

// router.post(path, [middleware1, middleware2, ..., middlewareN], handler) 可以传入多个中间件和最终的路由处理函数

// 管理用户角色（仅限 Admin 和 SuperAdmin）
router.post('/manage-roles', verifyToken, authorizeRoles('Admin', 'SuperAdmin'), (req, res) => {
    res.json({ message: 'User roles updated successfully' });
});

// 查看审计日志（仅限 Admin）
router.get('/audit-logs', verifyToken, authorizeRoles('Admin'), (req, res) => {
    res.json({ message: 'Audit logs retrieved' });
});

module.exports = router;
