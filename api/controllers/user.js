const mongoose = require("mongoose");
const User = require("../models/user");

async function index(req, res, next) {
    try {
        const users = await User.find().select("-__v");
        console.log(users);
        res.status(200).json(users);
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
        let user = await User.findById(id).select("-__v");
        if (user) {
            res.status(200).json(user);
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
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email
        });

        const result = await user.save();
        res.status(201).json({
            message: "User created",
            created_user: result
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
