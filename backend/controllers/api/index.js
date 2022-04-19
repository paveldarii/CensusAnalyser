const router = require("express").Router();

const censusDataRoutes = require("./census-data.js");

router.use("/census-data", censusDataRoutes);

module.exports = router;
