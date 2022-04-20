const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/connection");

router.get("/", async (req, res) => {
  //return all census data
  const censusData = await sequelize.query(
    `SELECT  countries.name, years.year, census_data.population
    FROM census_data
    LEFT JOIN countries ON census_data.country_id = countries.id
    LEFT JOIN years ON census_data.year_id = years.id ORDER BY countries.name ASC Limit 1000`,
    { type: QueryTypes.SELECT }
  );
  const data = formateData(censusData);
  res.setHeader("Content-Type", "application/json");
  res.json({ data });
});

function formateData(censusData) {
  let returnData = [];
  let localObj = {};
  let localData = [];
  censusData.forEach((item, index) => {
    if (index == 0) {
      localObj.name = censusData[0].name;
      localData.push([censusData[0].year, censusData[0].population]);
    } else if (item.name == censusData[index - 1].name) {
      localData.push([item.year, item.population]);
    } else if (item.name != censusData[index - 1].name) {
      localObj.data = localData;
      returnData.push(localObj);
      localObj = {};
      localData = [];
      localObj.name = item.name;
      localData.push([item.year, item.population]);
    }
  });
  return returnData;
}

module.exports = router;
