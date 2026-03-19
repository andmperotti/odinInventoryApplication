const pool = require("./pool");

async function getCategories() {
  //query for all category records, so we get back id and name
  let categories = await pool.query("SELECT * FROM categories ");
  return categories;
}

//get items of a specific category
async function getItems(id) {
  let items = await pool.query("SELECT * FROM items WHERE categoryid=id");
  return items;
}

module.exports = { getCategories, getItems };
