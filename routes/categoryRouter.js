const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/:categoryId", async (req, res) => {
  let categoryId = req.params.categoryId;
  let categoryReturn = await categoryController.getCategoryItems(categoryId);
  res.render("category", { ...categoryReturn });
});

module.exports = { categoryRouter };
