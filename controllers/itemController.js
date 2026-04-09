const dbQueries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateItem = [
  body("itemName").trim().isAlphanumeric().notEmpty(),
  body("itemQuantity").trim().isNumeric().notEmpty(),
  body("itemPrice").trim().isNumeric().notEmpty(),
  body("itemCategoryId").trim().isNumeric().notEmpty(),
];

exports.getItem = async (req, res) => {
  let item = await dbQueries.getItem(req.params.itemId);
  let categories = await dbQueries.getCategories();
  let categoryId = +req.query.categoryId;
  res.render("item", { item, categories, categoryId });
};

exports.getCreateItemPage = async (req, res) => {
  let categoryId = req.query.categoryId;
  let categories = await dbQueries.getCategories();
  res.render("createItem", { categories, categoryId });
};

exports.createItem = [
  validateItem,
  async (req, res) => {
    let errors = validationResult(req);
    //check if this itemName is already taken, giving back the itemid or false
    let itemRequest = await dbQueries.getItemId(req.body.itemName);
    let itemId = itemRequest.rows[0]?.id || false;
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    } else {
      //if it's false then it has not been taken
      if (itemId === false) {
        //create item
        let itemCreationAttempt = await dbQueries.createItem(
          req.body.itemName,
          req.body.itemQuantity,
          req.body.itemPrice,
          req.body.itemCategoryId,
        );
        //now make sure item was made, and reroute user to that item page for it
        let itemRequest = await dbQueries.getItemId(req.body.itemName);
        let itemId = itemRequest.rows[0].id;
        res.redirect(`/items/${itemId}`);
      } else {
        res.send("Item already exists");
      }
    }
  },
];

exports.updateItem = [
  validateItem,
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    } else {
      let updateResult = await dbQueries.updateItem(
        req.params.itemId,
        req.body.itemName,
        req.body.itemQuantity,
        req.body.itemPrice,
        req.body.itemCategoryId,
      );
      let itemId = req.params.itemId;
      res.redirect(`/items/${itemId}`);
    }
  },
];

exports.deleteItem = async (req, res) => {
  let deleteItemAttempt = await dbQueries.deleteItem(req.body.itemId);
  res.redirect("/");
};
