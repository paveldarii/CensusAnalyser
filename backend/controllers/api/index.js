const router = require("express").Router();

const censusRoutes = require("./census.js");

router.use("/census", censusRoutes);

module.exports = router;
