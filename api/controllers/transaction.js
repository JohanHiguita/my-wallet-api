const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
const moment = require('moment');


async function index(req, res, next) {
  //console.log(req.body)
  try {

    //const this_month = moment().startOf('month').format("YYYY-MM-DD");

    const transactions = await Transaction
      //.find({ payment_month: { $gte: this_month} })
      .find()
      .populate('category', 'name')
      .populate('account', 'name type')
      .sort({ createdAt: 'desc' })
      .limit(50)
      .select("-__v -user");
    //console.log(transactions);
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
      payment_month: req.body.payment_month,
      type: req.body.type,
      user: req.body.user_id,
      category: req.body.category_id,
      account: req.body.account_id
    });

    const result = await transaction.save();
    res.status(201).json({
      success: true,
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

async function destroy(req, res, next) {

  const transactionId = req.params.id;
  try {
    const response = await Transaction.deleteOne({ _id: transactionId });
    let success, message;
    if (response.ok) {
      success = true;
      message = "Transaction deleted";
    } else {
      success = false;
      message = "Transaction NO deleted";

    }
    res.status(200).json({
      success,
      message
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
  create,
  destroy
};
