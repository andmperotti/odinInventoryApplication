const dbQueries = require("../db/queries");

async function getCategoryItems(categoryId) {
  let items = await dbQueries.getItems(categoryId);
  return items
}

module.exports = { getCategoryItems };
