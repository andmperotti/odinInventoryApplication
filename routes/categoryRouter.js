const { Router } = require("express");
const categoryRouter = Router();
const dbQueries = require("../db/queries");

categoryRouter.get("/:categoryId", async (req, res) => {
  //items refers to items in the database which have a categoryID equal to that of the parent category clicked on
  let items = await dbQueries.getItems(req.params.categoryId);
  //to state the name of the category we use a small query in the url to carry it from the root route of the application to this category page. This is a band aid as I'm sure there is a better way to do this
  let category = req.query.category;
  //respond with the category view and passing it data from the db query and reroute the query parameter value
  res.render("category", { items, category });
});

module.exports = { categoryRouter };
