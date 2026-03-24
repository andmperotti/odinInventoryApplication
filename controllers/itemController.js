const dbQueries = require("../db/queries");

// async function getItems(categoryId) {
//   let items = await dbQueries.getItems(categoryId);
//   let categoryName = dbQueries.getCategoryName(categoryId);
//   res.render("items", { items, categoryId, categoryName });
// }

// async function createItem(name, quantity, price, categoryIds) {
//   //attempt item creation
//   //if successful respond with new item view
//   //otherwise respond with a statement on why it wasn't made
// }

async function getItem(itemId) {
  let item = await dbQueries.getItem(itemId);
  return item;
}

async function getCategories(){
  let categories = await dbQueries.getCategories()
  return categories
}

module.exports = { getItem, getCategories };
