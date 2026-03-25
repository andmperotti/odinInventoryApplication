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
  let item = await pool.query(`SELECT * FROM items WHERE id=${itemId}`);
  return item;
}

async function deleteItem(itemId) {
  let sql = `SELECT id FROM items WHERE items.id = ${itemId}`;
  await pool.query(sql);
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

module.exports = {
  getCategories,
  getCategoryName,
  deleteCategory,
  getCategoryItems,
  getItem,
  deleteItem,
  updatedItem,
};
