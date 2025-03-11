const express = require("express");
const router = express.Router();
const { verifyToken, generateToken } = require("../middlewares/authJWT");

// **1. 登录后生成 JWT（测试用）**
router.post("/login", (req, res) => {
    const fakeUser = { id: 1, role_id: "admin" };  // 模拟用户
    const token = generateToken(fakeUser); // 生成 JWT
    res.json({ token });  // 返回给前端
});

// **2. 受 JWT 保护的 API（前端测试用）**
router.get("/test-jwt", verifyToken, (req, res) => {
    res.json({ message: "JWT is valid!", user: req.user });
});

module.exports = router;
