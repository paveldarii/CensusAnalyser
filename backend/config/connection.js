const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = dotenv.config().parsed;
// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(DB_NAME, DB_USER, DB_PASS, {
      host: DB_HOST,
      dialect: "mysql",
      port: 3306,
    });

module.exports = sequelize;
