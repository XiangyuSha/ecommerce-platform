const express = require("express");
const router = express.Router();
const { verifyToken, generateToken } = require("../middlewares/authJWT");

router.post("/login", (req, res) => {
    const fakeUser = { id: 1, role_id: "admin" };
    const token = generateToken(fakeUser);
    res.json({ token });
});

router.get("/test-jwt", verifyToken, (req, res) => {
    res.json({ message: "JWT is valid!", user: req.user });
});

module.exports = router;
