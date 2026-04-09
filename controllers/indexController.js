let dbQueries = require("../db/queries");

exports.getCategories = async (req, res) => {
  let categories = await dbQueries.getCategories();
  res.render("homepage", { categories });
};
