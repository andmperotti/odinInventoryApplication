const { Router } = require("express");
const itemRouter = Router();
let itemController = require("../controllers/itemController");

itemRouter.get("/:itemId", async (req, res) => {
  let item = await itemController.getItem(req.params.itemId);
  res.render("item", { item });
});

itemRouter.delete("/:itemId", async (req, res) => {
  res.send("item deleted");
});
module.exports = { itemRouter };
