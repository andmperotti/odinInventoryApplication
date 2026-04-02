const { Router } = require("express");
const indexRouter = Router();
const dbQueries = require("../db/queries");

indexRouter.get("/", async (req, res) => {
  let categories = await dbQueries.getCategories();
  res.render("homepage", { categories });
});
module.exports = { indexRouter };
