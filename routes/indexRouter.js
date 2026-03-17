const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  //test return
  res.send("hihi");
  //generate links for each category in the db
});
module.exports = { indexRouter };
