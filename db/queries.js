const pool = require("./pool");

async function getCategories() {
  //query for all category records, so we get back id and name
  let categories = await pool.query("SELECT * FROM categories ");
  return categories;
}

async function getCategoryName(categoryId) {
  let category = await pool.query(
    `SELECT * FROM categories WHERE categories.id = ${categoryId}`,
  );
  return category.rows[0].name;
}

async function deleteCategory(categoryId) {
  let deleteAttempt = await pool.query(
    `DELETE * FROM categories WHERE categories.id = ${categoryId}`,
  );
  //if successful return true?
  //otherwise return false?
}

//get items of a specific category
async function getCategoryItems(categoryId) {
  let items = await pool.query(
    `SELECT * FROM items WHERE items.categoryIds LIKE '%${categoryId}%'`,
  );
  return items;
}

async function getItem(itemId) {
  let values = [itemId];
  let item = await pool.query(`SELECT * FROM items WHERE id=$1`, values);
  return item.rows[0];
}

async function getItemId(itemName) {
  let values = [itemName];
  let itemId = await pool.query(`SELECT id FROM items WHERE name=$1`, values);
  return itemId;
}

async function deleteItem(itemId) {
  let values = [itemId];
  let deleteResult = await pool.query(
    `DELETE FROM items WHERE items.id = $1`,
    values,
  );
  return deleteResult;
}

async function updatedItem(
  itemId,
  newName,
  newQuantity,
  newPrice,
  newCategoryIds,
) {
  let values = [...arguments];
  let updatedItem = await pool.query(
    `
    UPDATE items SET name=$2, price=$4, quantity=$3, categoryIds=$5 WHERE id=$1
     `,
    values,
  );
}

async function createItem(name, quantity, price, categoryIds) {
  //check if a record already exists (using the name value)
  //
  //if it does not already exist create it:
  let values = [name, quantity, price, categoryIds];
  let creationResult = await pool.query(
    "INSERT INTO items (name, quantity, price, categoryids) VALUES ($1, $2, $3, $4)",
    values,
  );
  //obtain the id value so we can redirect the user to the item page upon completion of creation
  creationResult.itemId = await getItemId(name);
  return creationResult;
}

module.exports = {
  getCategories,
  getCategoryName,
  deleteCategory,
  getCategoryItems,
  getItem,
  deleteItem,
  updatedItem,
  createItem,
};
