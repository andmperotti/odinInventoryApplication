const dbQueries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateCategory = [
  body("categoryName").trim().isLength({ min: 1 }).isAlpha(),
];

async function getCategoryItems(categoryId) {
  let items = await dbQueries.getCategoryItems(categoryId);
  let categoryName = await dbQueries.getCategoryName(categoryId);
  return { items, categoryName };
}

async function getCategories() {
  let categories = await dbQueries.getCategories();
  return categories;
}

async function createCategory(categoryName) {
  validateCategory;
  //if the category does not exist, make it and return the categoryId, otherwise return false because it exists
  let categoryCheck = await dbQueries.checkCategory(categoryName);
  if (!categoryCheck) {
    await dbQueries.createCategory(categoryName);
    let categoryId = await dbQueries.getCategoryId(categoryName);
    return categoryId;
  } else {
    return false;
  }
}

async function deleteCategory(categoryID) {
  return await dbQueries.deleteCategory(categoryID);
}

async function editCategory(categoryId, newCategoryName) {
  validateCategory;
  let editCategoryAttempt = await dbQueries.editCategory(
    categoryId,
    newCategoryName,
  );
  return editCategoryAttempt;
}

module.exports = {
  getCategoryItems,
  getCategories,
  createCategory,
  deleteCategory,
  editCategory,
};
