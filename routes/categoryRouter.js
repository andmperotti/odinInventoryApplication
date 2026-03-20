const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/:categoryId", async (req, res) => {
  let categoryId = req.params.categoryId;
  let items = await categoryController.getCategoryItems(categoryId);
  let categoryName = req.query.category;
  res.render("category", { items, categoryName });
});

module.exports = { categoryRouter };
