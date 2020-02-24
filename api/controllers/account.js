const mongoose = require("mongoose");
const helper = require ("../helpers/account");
const Account = require("../models/account");

async function index(req, res, next) {
    try {
        let accounts = await Account.find().select("-__v");
        accounts = await helper.add_extra_props(accounts); //add incomes, expenses, balance

        //add extra props using model's methods


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

            const expenses = await account.get_total_expenses();
            const incomes = await account.get_total_incomes();
            const balance = incomes - expenses;

            account = account.toObject(); //mongoose objects does not allow change props

            account["expenses"] = expenses;
            account["incomes"] = incomes;
            account["balance"] = balance;

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
