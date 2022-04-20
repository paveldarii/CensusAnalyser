const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/connection");

router.get("/countries", async (req, res) => {
  //return all countries and their ids
  const countries = await sequelize.query(`SELECT * from countries`, {
    type: QueryTypes.SELECT,
  });
  res.json({ countries });
});

router.get("/analytics/scatter", async (req, res) => {
  //return all census data formatted for scatter graph
  const censusData = await sequelize.query(
    `SELECT  countries.name, years.year, census_data.population
    FROM census_data
    LEFT JOIN countries ON census_data.country_id = countries.id
    LEFT JOIN years ON census_data.year_id = years.id ORDER BY countries.name ASC Limit 1000`,
    { type: QueryTypes.SELECT }
  );
  const data = formateAnalyticsData(censusData);
  res.json({ data });
});

router.get("/analytics/raw", async (req, res) => {
  //return all census data formatted for table
  const censusData = await sequelize.query(
    `SELECT  * FROM country_census_per_year`,
    { type: QueryTypes.SELECT }
  );
  const data = formateRawData(censusData);
  res.json({ columnNames, data });
});

function formateAnalyticsData(censusData) {
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

function formateRawData(censusData) {
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
