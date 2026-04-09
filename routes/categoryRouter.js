const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/create", categoryController.getCreateCategoryPage);
categoryRouter.get(
  "/editCategory/:categoryId",
  categoryController.getEditCategoryPage,
);

categoryRouter.post(
  "/deleteCategory/:categoryId",
  categoryController.deleteCategory,
);
categoryRouter.post("/createCategory", categoryController.createCategory);
categoryRouter.post(
  "/editCategory/:categoryId",
  categoryController.editCategory,
);
categoryRouter.get("/:categoryId", categoryController.getCategoryPage);

module.exports = { categoryRouter };
