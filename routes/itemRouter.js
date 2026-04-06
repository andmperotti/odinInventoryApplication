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
  let itemCreationAttempt = await itemController.createItem(
    req.body.itemName,
    req.body.itemQuantity,
    req.body.itemPrice,
    req.body.itemCategoryId,
  );
  if (itemCreationAttempt != false) {
    res.redirect(`/items/${itemCreationAttempt}`);
  } else {
    res.send("Item already exists");
  }
});

itemRouter.post("/updateItem/:itemId", async (req, res) => {
  let updateResult = await itemController.updateItem(
    req.params.itemId,
    req.body.itemName,
    req.body.itemQuantity,
    req.body.itemPrice,
    req.body.itemCategoryId,
  );
  let itemId = req.params.itemId;
  res.redirect(`/items/${itemId}`);
});

itemRouter.post("/deleteItem/:itemId", async (req, res) => {
  let deleteItemAttempt = await itemController.deleteItem(req.params.itemId);
  if (deleteItemAttempt) {
    res.redirect("/");
  } else {
    res.send("Could not delete item");
  }
});

module.exports = { itemRouter };
