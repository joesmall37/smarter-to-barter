const router = require("express").Router();
const userRoutes = require("./userRoutes");
const serviceRoutes = require("./serviceRoutes");
const offerRoutes = require("./offerRoutes")

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/offer", offerRoutes)

module.exports = router;
