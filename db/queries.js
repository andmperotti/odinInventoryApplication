const pool = require("./pool");

async function getCategories() {
  let categories = await pool.query("SELECT * FROM categories ");
  return categories;
}

async function getCategoryName(categoryId) {
  let values = [categoryId];
  let category = await pool.query(
    `SELECT * FROM categories WHERE categories.id = $1`,
    values,
  );
  return category.rows[0].name;
}

async function deleteCategory(categoryId) {
  let values = [categoryId];
  let deleteAttempt = await pool.query(
    `DELETE FROM categories WHERE categories.id = $1`,
    values,
  );
  //change to remove items that are associated with it as well
  let deleteCategoryItems = pool.query(
    "DELETE FROM items WHERE categoryId = $1",
    values,
  );
  return (deleteAttempt.rowCount = 1 ? true : false);
}

async function getCategoryItems(categoryId) {
  let values = [categoryId];
  let items = await pool.query(
    `SELECT * FROM items WHERE items.categoryId = $1`,
    values,
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
    `DELETE FROM items WHERE id = $1`,
    values,
  );
  return deleteResult;
}

async function updateItem(
  itemId,
  newName,
  newQuantity,
  newPrice,
  newCategoryId,
) {
  let values = [...arguments];
  let updatedItem = await pool.query(
    `
    UPDATE items SET name=$2, price=$4, quantity=$3, categoryId=$5 WHERE id=$1
     `,
    values,
  );
}

async function createItem(name, quantity, price, categoryId) {
  let values = [name, quantity, price, categoryId];
  let creationResult = await pool.query(
    "INSERT INTO items (name, quantity, price, categoryId) VALUES ($1, $2, $3, $4)",
    values,
  );
}

async function createCategory(categoryName) {
  let values = [categoryName];
  let categoryCreation = await pool.query(
    `INSERT INTO categories (name) VALUES($1)`,
    values,
  );
  return categoryCreation;
}

async function getCategoryId(categoryName) {
  let values = [categoryName];
  let queryResult = await pool.query(
    "SELECT id FROM categories WHERE name = $1",
    values,
  );
  return queryResult.rows[0].id;
}

async function checkCategory(categoryName) {
  let values = [categoryName];
  let result = await pool.query(
    "SELECT name FROM categories WHERE name=$1",
    values,
  );
  return result.rows[0];
}

async function editCategory(categoryId, newCategoryName) {
  let values = [categoryId, newCategoryName];
  return await pool.query(
    "UPDATE categories SET name = $2 WHERE id = $1",
    values,
  );
}

module.exports = {
  getCategories,
  getCategoryName,
  getCategoryId,
  getCategoryItems,
  checkCategory,
  createCategory,
  deleteCategory,
  editCategory,
  getItem,
  getItemId,
  deleteItem,
  updateItem,
  createItem,
};
