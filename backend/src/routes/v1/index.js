const express = require("express");
const authRoutes = require("./auth.routes");

const assetRoutes = require("./assets.routes");
const assetTypesRoutes = require("./assets-types.routes");
const ownersRoutes = require("./owners.routes");
const usersRoutes = require("./users.routes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/assets", assetRoutes);
router.use("/asset-types", assetTypesRoutes);
router.use("/owners", ownersRoutes);
router.use("/users", usersRoutes);

module.exports = router;