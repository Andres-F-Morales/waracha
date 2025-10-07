const express = require("express");
const router = express.Router();
const AssetTypes = require("../../models/asset-types.model");
const { hash } = require("bcrypt");
const auth = require("../../middlewares/auth");

router.use(auth.protect);

// Listar todos los asset-types
router.get("/", async (req, res) => {
    try {
        const { asset_types, totalCount } = await AssetTypes.all(req.query);
        const [rangeStart] = req.query.range ? JSON.parse(req.query.range) : [0];
        let rangeEnd = rangeStart + asset_types.length - 1;
        if (asset_types.length === 0) {
            rangeEnd = 0; 
        }
        res.set('Content-Range', `asset-types ${rangeStart}-${rangeEnd}/${totalCount}`);
        res.json(asset_types);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener asset-type por ID
router.get("/:id", async (req, res) => {
    try {
        const asset_types = await AssetTypes.findById(req.params.id);
        if (!asset_types) return res.status(404).json({ error: "Asset-type no encontrado" });
        res.json(asset_types);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
