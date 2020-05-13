const Config = require("../models/config");
const Transaction = require("../models/transaction");
const moment = require("moment");

async function info(req, res, next) {
    try {

        const begin_month = moment().startOf("month").format("YYYY-MM-DD");
        const end_month = moment().endOf("month").format("YYYY-MM-DD");

        const config = Config.find().select("-__v");
        const transactions = Transaction.find({
            type: "expense",
            payment_month: { $gte: begin_month, $lte: end_month },
        }).populate({
            path: "category",
            match: {
                is_fixed_expense: false,
            },
        });

        const promises = await Promise.all([config, transactions]);

        const budget = promises[0][0].budget;
        const spent = promises[1]
            .filter((trans) => trans.category != null)
            .reduce((acc, curr) => acc + curr["amount"], 0);
        const info = {
            budget: budget,
            spent: spent,
        };
        res.status(200).json(info);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
        });
    }
}
module.exports = {
    info,
};
