const { Router } = require("express");
const itemRouter = Router();
let itemController = require("../controllers/itemController");

itemRouter.get("/createItem", async (req, res) => {
  let categories = await itemController.getCategories();
  res.render("createItem", { categories });
});

itemRouter.get("/:itemId", async (req, res) => {
  let item = await itemController.getItem(req.params.itemId);
  let categories = await itemController.getCategories();
  res.render("item", { item, categories });
});

itemRouter.post("/createItem", async (req, res) => {
  let creationResult = await itemController.createItem(
    req.body.itemName,
    req.body.itemQuantity,
    req.body.itemPrice,
    req.body.itemCategoryIds,
  );
  res.redirect(`/items/${creationResult.itemId.rows[0].id}`);
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

itemRouter.delete("/:itemId", async (req, res) => {
  res.send("item deleted");
});

module.exports = { itemRouter };
