const { Router } = require("express");
const indexRouter = Router();
const dbQueries = require("../db/queries");

indexRouter.get("/", async (req, res) => {
  //generate links for each category in the db
  //so query db for categories, also obtaining their id in the table as this will be used to access specific category pages
  let categories = await dbQueries.getCategories();
  res.render("homepage", { categories });
});
module.exports = { indexRouter };
