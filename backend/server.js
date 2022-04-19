const path = require("path");
const express = require("express");
const routes = require("./controllers/");

const app = express();
const PORT = process.env.PORT || 3003;
const sequelize = require("./config/connection");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
