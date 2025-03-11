const jwt = require('jsonwebtoken')
require('dotenv').config()

// Generate JWT token
function generateToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role_id },
        process.env.JWT_SECRET,
        { expiresIn:'1h' }
    )
}

// verify token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // 获取 Bearer 之后的部分,也就是token
    if (!token) res.status(401).json({ message: 'Access denied. No token provided. '})
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = decoded;  // 解析 JWT 并存入 req.user
        next()
    })
}

module.exports = { generateToken, verifyToken };