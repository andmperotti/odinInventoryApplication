const { Router } = require("express");
const indexRouter = Router();
const dbQueries = require("../db/queries");
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getCategories);

module.exports = { indexRouter };
