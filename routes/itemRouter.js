const { Router } = require("express");
const itemRouter = Router();
let itemController = require("../controllers/itemController");

itemRouter.get("/:itemId", async (req, res) => {
  let item = await itemController.getItem(req.params.itemId);
  let categories = await itemController.getCategories();
  res.render("item", { item, categories });
});

itemRouter.delete("/:itemId", async (req, res) => {
  res.send("item deleted");
});

itemRouter.post("/updateItem/:itemId", async (req, res) => {
  let updateResult = await itemController.updateItem(
    req.params.itemId,
    req.body.itemName,
    req.body.itemQuantity,
    req.body.itemPrice,
    req.body.itemCategoryIds,
  );
  let itemId = req.params.itemId;
  res.redirect(`/items/${itemId}`);
});

module.exports = { itemRouter };
