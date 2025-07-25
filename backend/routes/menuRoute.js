const express = require("express");
const { isVerifiedUser } = require("../middlewares/tokenVerification");
const { addCategory, getAllCategory, getItemByCategory, updateCategory, addDish, updateDish, deleteDish, getMenu } = require("../controllers/menuController");
const router = express.Router();

// Add new category
router.post("/", isVerifiedUser, addCategory);

// Get all categories
router.get("/",isVerifiedUser, getMenu);

// Update category
router.put("/category/:id", isVerifiedUser, updateCategory);

// Add dish to a category
router.post("/dish", isVerifiedUser, addDish);

// Update a dish
router.put("/dish/:id", isVerifiedUser, updateDish);

// Delete a dish from a category
router.delete("/dish/:dishId/:categoryId", isVerifiedUser, deleteDish);

module.exports = router;
