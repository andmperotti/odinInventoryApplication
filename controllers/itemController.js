const dbQueries = require("../db/queries");

async function createItem(name, quantity, price, categoryId) {
  let creationResult = dbQueries.createItem(name, quantity, price, categoryId);
  return creationResult;
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
  let updateResult = await dbQueries.updatedItem(
    itemId,
    newName,
    newQuantity,
    newPrice,
    newCategoryId,
  );
}

module.exports = { getItem, getCategories, updateItem, createItem };
