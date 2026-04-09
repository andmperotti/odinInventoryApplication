const { Router } = require("express");
const itemRouter = Router();
let itemController = require("../controllers/itemController");

itemRouter.get("/createItem", itemController.getCreateItemPage);
itemRouter.post("/createItem", itemController.createItem);
itemRouter.post("/updateItem/:itemId", itemController.updateItem);
itemRouter.post("/deleteItem/:itemId", itemController.deleteItem);
itemRouter.get("/:itemId", itemController.getItem);

module.exports = { itemRouter };
