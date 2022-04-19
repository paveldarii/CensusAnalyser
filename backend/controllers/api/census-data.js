const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/connection");

router.get("/", async (req, res) => {
  //return all census data
  const censusData = await sequelize.query(
    `SELECT  countries.name, years.year, census_data.population
    FROM census_data
    LEFT JOIN countries ON census_data.country_id = countries.id
    LEFT JOIN years ON census_data.year_id = years.id ORDER BY countries.name ASC`,
    { type: QueryTypes.SELECT }
  );
  res.setHeader("Content-Type", "application/json");
  res.json({ ...censusData });
});

module.exports = router;
