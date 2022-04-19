const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/connection");

router.get("/", async (req, res) => {
  //return all census data

  res.setHeader("Content-Type", "application/json");
  res.json({ ...result1 });
});

module.exports = router;
