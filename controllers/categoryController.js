const dbQueries = require("../db/queries");

async function getCategoryItems(categoryId) {
  let items = await dbQueries.getCategoryItems(categoryId);
  let categoryName = await dbQueries.getCategoryName(categoryId);
  return { items, categoryName };
}

// async function createCategory(){

// }

module.exports = { getCategoryItems };
