const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/connection");
const columnNames = require("../../assets/countries.js");
router.get("/", async (req, res) => {
  //return all census data
  const censusData = await sequelize.query(
    `SELECT  * FROM country_census_per_year`,
    { type: QueryTypes.SELECT }
  );
  const data = formateData(censusData);
  res.setHeader("Content-Type", "application/json");
  res.json({ columnNames, data });
});

function formateData(censusData) {
  var returnArray = [];
  censusData.forEach((item) => {
    var localArray = [];
    Object.keys(item).map(function (key, index) {
      if (!item[key]) {
        localArray.push("N/A");
      } else {
        localArray.push(item[key].trim());
      }
    });
    returnArray.push(localArray);
  });
  return returnArray;
}

module.exports = router;
