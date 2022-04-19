const path = require("path");
const express = require("express");
const routes = require("./controllers/");

const app = express();
const PORT = process.env.PORT || 3002;

const sequelize = require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
