const createCsvWriter = require("csv-writer").createObjectCsvWriter;

//the function below takes data from countries, years, and country_census_per_year tables and combine them to be able to import into census_data
const mapDataIntoCsv = function (countryCensusPerYear, countries, years) {
  var insertList = [];
  countryCensusPerYear.forEach((item) => {
    var year_id;
    for (const property in item) {
      if (property == "Year") {
        years.forEach((year) => {
          if (item["Year"] == year.year) {
            year_id = year.id;
          }
        });
      } else {
        countries.forEach((country) => {
          var objToPush = { year_id };
          if (
            property.trim() == country.name.trim() &&
            item[property] &&
            year_id
          ) {
            objToPush.country_id = country.id;
            objToPush.population = parseInt(item[property].replace(/,/g, ""));
            insertList.push(objToPush);
          }
        });
      }
    }
  });
  const csvWriter = createCsvWriter({
    path: "out.csv",
    header: [
      { id: "year_id", title: "year_id" },
      { id: "country_id", title: "country_id" },
      { id: "population", title: "population" },
    ],
  });
};

module.export = mapDataIntoCsv;
