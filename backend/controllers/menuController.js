const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const Dish = require("../models/dishesModel");
const Category = require("../models/menuModel");

// Add new category
const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        // Check if category with same name exists (case-insensitive)
        const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists!",
            });
        }

        // Create new category
        const category = new Category(req.body);
        await category.save();

        res.status(200).json({
            success: true,
            message: "Category Created!",
            data: category
        });
    } catch (error) {
        next(error);
    }
};


// Get all categories
const getMenu = async (req, res, next) => {
    try {
        const categories = await Category.find().populate("items");

        res.status(200).json({
            success: true,
            message: "All categories fetched successfully",
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

// Get dishes by category name
// const getItemByCategory = async (req, res, next) => {
//     try {
//         const { category } = req.params;

//         const categoryData = await Category.findOne({ category }).populate("dishes");

//         if (!categoryData) {
//             return next(createHttpError(404, "Category does not exist"));
//         }

//         res.status(200).json({
//             success: true,
//             data: categoryData.dishes
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// Update category name
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { category } = req.body;

        if (!category || category.trim() === "") {
            return next(createHttpError(400, "New category name is required"));
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { category },
            { new: true }
        );

        if (!updatedCategory) {
            return next(createHttpError(404, "Category not found"));
        }

        res.status(200).json({
            message: "Category updated successfully",
            data: updatedCategory
        });
    } catch (error) {
        next(error);
    }
};

// Add new dish and assign it to a category
const addDish = async (req, res, next) => {
    try {
        if (!req.body) {
            return next(createHttpError(400, "Request body is missing. Make sure you are sending JSON and Content-Type is application/json."));
        }
        const { name, price, categoryId } = req.body;

        if (!name || !price || !categoryId) {
            return next(createHttpError(400, "Dish name, price, and categoryId are required"));
        }

        const dish = await Dish.create({ name, price , category: categoryId });

        const category = await Category.findById(categoryId);
        if (!category) {
            return next(createHttpError(404, "Category not found"));
        }

        category.items.push(dish._id);
        await category.save();

        res.status(201).json({
            success: true,
            message: "Dish added to category successfully",
            data: dish
        });
    } catch (error) {
        // Handle duplicate key error (dish name must be unique)
        if (error.code === 11000) {
            return next(createHttpError(400, "A dish with this name already exists!"));
        }
        next(error);
    }
};

// Update dish details
const updateDish = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const updatedDish = await Dish.findByIdAndUpdate(
            id,
            { name, price },
            { new: true }
        );

        if (!updatedDish) {
            return next(createHttpError(404, "Dish not found"));
        }

        res.status(200).json({
            success: true,
            message: "Dish updated successfully",
            data: updatedDish
        });
    } catch (error) {
        next(error);
    }
};

// Delete dish and remove from category
const deleteDish = async (req, res, next) => {
    try {
        const { dishId, categoryId } = req.params;

        const dish = await Dish.findByIdAndDelete(dishId);
        if (!dish) {
            return next(createHttpError(404, "Dish not found"));
        }

        // Remove from category's items list
        await Category.findByIdAndUpdate(categoryId, {
            $pull: { items: dishId }
        });

        res.status(200).json({
            success: true,
            message: "Dish deleted successfully",
            data: dish
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addCategory,
    getMenu,
    updateCategory,
    addDish,
    updateDish,
    deleteDish
};
