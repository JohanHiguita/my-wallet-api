const mongoose = require("mongoose");
const Account = require("../models/account");

async function index(req, res, next) {
    try {
        const accounts = await Account.find();
        console.log(accounts);
        res.status(200).json(accounts);
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
        let account = await Account.findById(id).select("-__v");
        if (account) {
            res.status(200).json(account);
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
      const account = new Account({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type
      });

      const result = await account.save();
      res.status(201).json({
        message: "Account created",
        created_account: result
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
