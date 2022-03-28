const categoryRouter = require("express").Router();
const categories = require("../controllers/categories");

categoryRouter.get("/", categories.getAllCategories);
categoryRouter.get("/:category", categories.getItemByCategory);

module.exports = categoryRouter;