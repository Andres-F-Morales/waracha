const express = require("express");
const router = express.Router();
const User = require("../../models/user.model");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    console.log('login');
    try {
        const { email, password } = req.body;

        console.log(req.body);
        const fail = { error: "Email o contraseña incorrectos" };

        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json(fail);

        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(400).json(fail);

        const token = sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || "1h" }
        );

        res.json({ message: "Login exitoso", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;