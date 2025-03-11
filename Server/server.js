require('dotenv').config()

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authentication')
const { verifyToken } = require('./middlewares/authJWT')
const dbTestRoutes = require('./routes/dbTestRoute')
const apiTest = require('./routes/apiTestRoute')

const app = express()

app.use(express.json()) // parse json
app.use(cors())
// app.use('/api', apiTest)
// app.use('/api', dbTestRoutes) // 把 dbTestRoutes 里所有路由都挂载到 /api 下
app.use('/auth', authRoutes); // 认证路由（登录、注册）


const testUser = {
    id: 1,
    role: "Admin"
};

// Default path - Welcome letter
app.get("/", (req, res) => {
    res.send("Welcome to the backend API!");
});

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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});