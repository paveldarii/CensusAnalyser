const router = require("express").Router();

const censusDataRoutes = require("./census-data.js");
const censusRawDataRoutes = require("./census-raw-data.js");

router.use("/census-data", censusDataRoutes);
router.use("/census-raw-data", censusRawDataRoutes);

module.exports = router;
