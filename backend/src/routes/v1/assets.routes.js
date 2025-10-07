const express = require("express");
const router = express.Router();
const Asset = require("../../models/asset.model");
const auth = require("../../middlewares/auth");
const { validateAssetCreation, validateAssetUpdate } = require("../../validators/asset.validator");

router.use(auth.protect);

// Listar todos los assets
router.get("/", async (req, res) => {
    try {
        const { assets, totalCount } = await Asset.all(req.query);
        const [rangeStart] = req.query.range ? JSON.parse(req.query.range) : [0];
        let rangeEnd = rangeStart + assets.length - 1;
        if (assets.length === 0) {
            rangeEnd = 0; 
        }
        res.set('Content-Range', `assets ${rangeStart}-${rangeEnd}/${totalCount}`);
        res.json(assets);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener asset por ID
router.get("/:id", async (req, res) => {
    try {
        const asset = await Asset.findById(req.params.id);
        if (!asset) return res.status(404).json({ error: "Asset no encontrado" });
        res.json(asset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear asset
router.post("/", validateAssetCreation, async (req, res) => {
    try {
        const { name, type_id, owner_id, serial } = req.body;

        const assetExist = await Asset.findBySerial(serial);
        if (assetExist) {
            return res.status(400).json({ 
                errors: [{ 
                    path: 'serial',
                    msg: 'El serial ya existe. Debe ser único.' 
                }] 
            });
        }

        const asset = await Asset.create({ name, type_id, owner_id, serial });
        res.status(201).json(asset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Actualizar asset
router.put("/:id", validateAssetUpdate, async (req, res) => {
    try {
        const { name, type_id, owner_id, serial } = req.body;
        const asset = await Asset.update(req.params.id, { name, type_id, owner_id, serial });
        if (!asset) return res.status(404).json({ error: "Asset no encontrado" });
        res.json(asset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Eliminar asset
router.delete("/:id", async (req, res) => {
    try {
        await Asset.delete(req.params.id);
        res.json({ message: "Asset eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;