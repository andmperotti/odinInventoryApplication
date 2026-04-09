const dbQueries = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

//validation function
const validateCategory = [
  body("categoryName").trim().isLength({ min: 1 }).isAlpha(),
];

//accessory functions
async function getCategoryItems(categoryId) {
  let items = await dbQueries.getCategoryItems(categoryId);
  let categoryName = await dbQueries.getCategoryName(categoryId);
  return { items, categoryName };
}

//controller functions
exports.getCategoryPage = async (req, res) => {
  let categoryId = req.params.categoryId;
  let categoryReturn = await getCategoryItems(categoryId);
  res.render("category", { ...categoryReturn, categoryId });
};

exports.getCreateCategoryPage = (req, res) => {
  res.render("createCategory");
};

exports.createCategory = [
  validateCategory,
  async (req, res) => {
    //if the category does not exist, make it and return the categoryId, otherwise return false because it exists
    let categoryCheck = await dbQueries.checkCategory(req.body.categoryName);
    if (!categoryCheck) {
      const errors = validationResult(req);
      //if validation errors:
      if (!errors.isEmpty()) {
        return res.status(400).send({
          errors: errors.array(),
        });
      } else {
        await dbQueries.createCategory(req.body.categoryName);
        let categoryId = await dbQueries.getCategoryId(req.body.categoryName);
        // return categoryId;
        res.redirect(`/category/${categoryId}`);
      }
    } else {
      // return false;
      res.send("Cannot create that category");
    }
  },
];

exports.deleteCategory = [
  async (req, res) => {
    let categoryId = req.params.categoryId;
    let categoryDeletionResult = await dbQueries.deleteCategory(categoryId);
    if (categoryDeletionResult === true) {
      res.redirect("/");
    } else {
      res.send("Couldn't delete that category");
    }
  },
];

exports.getEditCategoryPage = async (req, res) => {
  let categoryId = req.params.categoryId;
  let categoryDetails = await dbQueries.getCategoryName(categoryId);
  let category = categoryDetails;
  res.render("editCategory", { category, categoryId });
};

exports.editCategory = [
  validateCategory,
  async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    } else {
      let categoryId = req.params.categoryId;
      let editCategoryAttempt = await dbQueries.editCategory(
        categoryId,
        req.body.categoryName,
      );
      res.redirect("/");
    }
  },
];
