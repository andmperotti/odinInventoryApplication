const pool = require("./pool");

async function getCategories() {
  //query for all category records, so we get back id and name
  let categories = await pool.query("SELECT * FROM categories ");
  return categories;
}

//get items of a specific category

module.exports = { getCategories };
