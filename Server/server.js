require('dotenv').config()

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth')
const { verifyToken } = require('./middlewares/authJWT')
const dbTestRoutes = require('./routes/dbTestRoute')
const apiTest = require('./routes/apiTestRoute')

const app = express()

app.use(express.json()) // parse json
app.use(cors())
app.use('/auth', authRoutes); // 认证路由（登录、注册）


const testUser = {
    id: 1,
    role: "Admin"
};

// Default path - Welcome letter
app.get("/", (req, res) => {
    res.send("Welcome to the backend API!");
});

const db = require("./models/db");
db.execute("SELECT 1")
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ Database connection failed", err));


// JWT testing - generate jwt
app.get('/generate-jwt', (req, res) => {
    const token = jwt.sign(
        { id: testUser.id, role: testUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ token });
});

// test jwt
app.get('/test-jwt', (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json({ message: "JWT is valid!", user: decoded });
    });
});


// WebSocket

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});