const mongoose = require("mongoose");
const Config = require("../models/config");

async function show(req, res, next) {
    const user_id = req.params.user_id;
    try {
        let config = await Config.findOne({ user: user_id });
        if (config) {
            res.status(200).json(config);
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
        const config = new Config({
            _id: new mongoose.Types.ObjectId(),
            budget: req.body.budget,
            user: req.body.user_id,
        });

        const result = await config.save();
        res.status(201).json({
            message: "Config created",
            created_config: result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

module.exports = {
    show,
    create
};
