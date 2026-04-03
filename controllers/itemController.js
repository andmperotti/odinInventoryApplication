const dbQueries = require("../db/queries");

async function createItem(name, quantity, price, categoryId) {
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
  let updateResult = await dbQueries.updatedItem(
    itemId,
    newName,
    newQuantity,
    newPrice,
    newCategoryId,
  );
}

module.exports = { getItem, getCategories, updateItem, createItem };
