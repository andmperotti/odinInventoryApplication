const dbQueries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateItem = [
  body("name").trim().isAlphanumeric().notEmpty(),
  body("quantity").trim().isNumeric().notEmpty(),
  body("price").trim().isNumeric().notEmpty(),
  body("categoryId").trim().isNumeric().notEmpty(),
];
async function createItem(name, quantity, price, categoryId) {
  validateItem;
  let itemId = await dbQueries.getItemId(name);
  itemId = itemId.rows[0]?.id || false;
  if (itemId === false) {
    let creationResult = await dbQueries.createItem(
      name,
      quantity,
      price,
      categoryId,
    );
    let itemId = await dbQueries.getItemId(name);
    itemId = itemId.rows[0].id;
    return itemId;
  } else {
    return false;
  }
}

async function getItem(itemId) {
  let item = await dbQueries.getItem(itemId);
  return item;
}

async function getCategories() {
  let categories = await dbQueries.getCategories();
  return categories;
}

async function updateItem(
  itemId,
  newName,
  newQuantity,
  newPrice,
  newCategoryId,
) {
  validateItem;
  let updateResult = await dbQueries.updatedItem(
    itemId,
    newName,
    newQuantity,
    newPrice,
    newCategoryId,
  );
}

async function deleteItem(itemId) {
  let deleteItemAttempt = await dbQueries.deleteItem(itemId);
  return deleteItemAttempt;
}

module.exports = { getItem, getCategories, updateItem, createItem, deleteItem };
