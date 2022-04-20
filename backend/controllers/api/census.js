const router = require("express").Router();
const { QueryTypes, where } = require("sequelize");
const sequelize = require("../../config/connection");
const columnNames = require("../../assets/countries");

router.get("/countries", async (req, res) => {
  //return all countries and their ids
  const countries = await sequelize.query(`SELECT * from countries`, {
    type: QueryTypes.SELECT,
  });
  res.json({ countries });
});

router.get("/analytics/scatter/:ids", async (req, res) => {
  var idsArray = req.params.ids.split(",");
  var whereStatement = ``;
  idsArray.forEach((id) => {
    let isNum = !isNaN(parseInt(id));
    if (isNum && whereStatement == "") {
      whereStatement += ` WHERE census_data.country_id = ${id} `;
    } else if (isNum && whereStatement != "") {
      whereStatement += ` or census_data.country_id = ${id} `;
    }
  });

  if (whereStatement == "") {
    res.json({});
  }

  //return all census data formatted for scatter graph
  const censusData = await sequelize.query(
    `SELECT  countries.name, years.year, census_data.population
    FROM census_data
    LEFT JOIN countries ON census_data.country_id = countries.id
    LEFT JOIN years ON census_data.year_id = years.id
    ${whereStatement}
    ORDER BY countries.name ASC`,
    { type: QueryTypes.SELECT }
  );
  const data = formateAnalyticsScatterData(censusData);
  res.json({ data });
});

router.get("/analytics/raw", async (req, res) => {
  //return all countries and their ids
  const censusData = await sequelize.query(
    `SELECT  * FROM country_census_per_year`,
    { type: QueryTypes.SELECT }
  );
  const data = formateRawData(censusData);
  res.json({ columnNames, data });
});

function formateAnalyticsScatterData(censusData) {
  let returnData = [];
  let localObj = {};
  let localData = [];
  for (let i = 0; i < censusData.length; i++) {
    if (i == 0) {
      localObj.name = censusData[i].name;
      localData.push([censusData[i].year, censusData[i].population]);
      continue;
    } else if (censusData[i].name == censusData[i - 1].name) {
      localData.push([censusData[i].year, censusData[i].population]);
      if (i != censusData.length - 1) {
        continue;
      }
    }
    localObj.data = localData;
    returnData.push(localObj);
    localObj = {};
    localData = [];
    localObj.name = censusData[i].name;
    localData.push([censusData[i].year, censusData[i].population]);
  }
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
