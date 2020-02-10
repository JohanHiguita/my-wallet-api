const mongoose = require("mongoose");
const Category = require("../models/category");

async function index(req, res, next) {
    try {
        const categories = await Category.find("-__v");
        console.log(categories);
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

async function show(req, res, next) {
    const id = req.params.id;
    try {
        let category = await Category.findById(id).select("-__v");
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({
                message: `No valid entry found for id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
}

async function create(req, res, next) {
    try {
      const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        is_fixed_expense: req.body.is_fixed_expense,
        user: req.body.user_id
      });

      const result = await category.save();
      res.status(201).json({
        message: "Category created",
        created_category: result
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    }
}

module.exports = {
    index,
    show,
    create
};
