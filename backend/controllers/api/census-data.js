const router = require("express").Router();

router.get("/", (req, res) => {
  //return all census data
  res.setHeader("Content-Type", "application/json");
  res.json({ data: "good job" });
});

module.exports = router;
