const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/create", (req, res) => {
  res.render("createCategory");
});

categoryRouter.get("/:categoryId", async (req, res) => {
  let categoryId = req.params.categoryId;
  let categoryReturn = await categoryController.getCategoryItems(categoryId);
  res.render("category", { ...categoryReturn, categoryId });
});

categoryRouter.post("/create", async (req, res) => {
  let categoryName = req.body.categoryName;
  let categoryCreationAttempt =
    await categoryController.createCategory(categoryName);

  if (categoryCreationAttempt !== false) {
    res.redirect(`/category/${categoryCreationAttempt}`);
  } else {
    res.send("Category already exists");
  }
});

module.exports = { categoryRouter };
