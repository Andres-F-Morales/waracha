const express = require("express");
const router = express.Router();
const Owner = require("../../models/owner.model");
const { hash } = require("bcrypt");
const auth = require("../../middlewares/auth");

router.use(auth.protect);

// Listar todos los owners
router.get("/", async (req, res) => {
    try {
        const { owners, totalCount } = await Owner.all(req.query);
        const [rangeStart] = req.query.range ? JSON.parse(req.query.range) : [0];
        let rangeEnd = rangeStart + owners.length - 1;
        if (owners.length === 0) {
            rangeEnd = 0; 
        }
        res.set('Content-Range', `owners ${rangeStart}-${rangeEnd}/${totalCount}`);
        res.json(owners);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener owner por ID
router.get("/:id", async (req, res) => {
    try {
        const owner = await Owner.findById(req.params.id);
        if (!owner) return res.status(404).json({ error: "Owner no encontrado" });
        res.json(owner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear owner
router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        const ownerExist = await Owner.findByEmail(email);
        if (ownerExist) return res.status(400).json({ error: "El email ya existe" });

        const owner = await Owner.create({ first_name, last_name, email });
        res.status(201).json(owner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Actualizar owner
router.put("/:id", async (req, res) => {
    try {
        const { first_name, last_name } = req.body;
        const owner = await Owner.update(req.params.id, { first_name, last_name });
        if (!owner) return res.status(404).json({ error: "Owner no encontrado" });
        res.json(owner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
    try {
        await Owner.delete(req.params.id);
        res.json({ message: "Owner eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;