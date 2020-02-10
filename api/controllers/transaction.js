const mongoose = require("mongoose");
const Transaction = require("../models/transaction");

async function index(req, res, next) {
    try {
        const transactions = await Transaction.find("-__v");
        console.log(transactions);
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
}

async function show(req, res, next) {

}

async function create(req, res, next) {
    try {
      const transaction = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        amount: req.body.amount,
        note: req.body.note,
        date: req.body.date,
        type: req.body.type,
        user: req.body.user_id,
        category: req.body.category_id,
        account: req.body.account_id
      });

      const result = await transaction.save();
      res.status(201).json({
        message: "Transaction created",
        created_transaction: result
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
