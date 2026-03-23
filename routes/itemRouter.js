const { Router } = require("express");
const itemRouter = Router();
const dbQueries = require("../db/queries");

itemRouter.get("/:itemId", async (req, res) => {
  let item = await dbQueries.getItem(req.params.itemId);
  res.render("item", { item });
});

itemRouter.delete("/:itemId", async (req, res) => {
  res.send("item deleted");
});
module.exports = { itemRouter };
