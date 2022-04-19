const Sequelize = require("sequelize");

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize("er99zbca80nnnoly", "va2qcnfxcref8jvm", "qulbanwrwwmurdjg", {
      host: "acw2033ndw0at1t7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
      dialect: "mysql",
      port: 3306,
    });

module.exports = sequelize;
