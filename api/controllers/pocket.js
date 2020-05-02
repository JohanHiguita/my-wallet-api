const mongoose = require("mongoose");
const Pocket = require("../models/pocket");
const moment = require('moment');


/* async function index(req, res, next) {

    try {

        const this_month = moment().startOf('month').format("YYYY-MM-DD");

        const transactions = await Transaction
        .find({ date: { $gte: this_month} })
        .populate('category', 'name')
        .populate('account', 'name type')
        .sort({ date: 'desc'})
        .select("-__v -user");
        //console.log(transactions);
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
} */

/* async function show(req, res, next) {

} */

async function create(req, res, next) {
    try {
      const pocket = new Pocket({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description,
        account: req.body.account_id,
        user: req.body.user_id
      });

      const result = await pocket.save();
      res.status(201).json({
        success: true,
        message: "Pocket created",
        created_pocket: result
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error
      });
    }
}

module.exports = {
    create
};
