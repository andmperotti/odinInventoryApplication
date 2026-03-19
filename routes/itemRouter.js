const { Router } = require("express");
const itemRouter = Router();
const dbQueries = require("../db/queries");

itemRouter.get("/:itemId", async (req, res) => {
  let item = await dbQueries.getItem(req.params.itemId);
  let categoryName = req.query.category;
  res.render("item", { item, categoryName });
});

module.exports = { itemRouter };
