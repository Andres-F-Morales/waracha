const express = require("express");
const router = express.Router();
const User = require("../../models/user.model");
const { hash } = require("bcrypt");
const auth = require("../../middlewares/auth");

router.use(auth.protect);

// Listar todos los usuarios
router.get("/", async (req, res) => {
    try {
        const { users, totalCount } = await User.all(req.query);
        const [rangeStart] = req.query.range ? JSON.parse(req.query.range) : [0];
        const rangeEnd = rangeStart + users.length - 1;
        res.set('Content-Range', `users ${rangeStart}-${rangeEnd}/${totalCount}`);
        res.json(users);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear usuario
router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;

        const userExist = await User.findByEmail(email);
        if (userExist) return res.status(400).json({ error: "El email ya existe" });

        const hashed = await hash(password, 10);

        const user = await User.create({ first_name, last_name, email, password: hashed, role });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
    try {
        const { first_name, last_name } = req.body;
        const user = await User.update(req.params.id, { first_name, last_name });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
    try {
        await User.delete(req.params.id);
        res.json({ message: "Usuario eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;