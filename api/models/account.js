const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        name: {
            type: String,
            required: [true, "No name provided"],
            trim: true
        },
        type: {
            type: String,
            enum: ["cash", "savings", "credit card"],
            required: [true, "No type provided"]
        }
    },

    { timestamps: {} }
);

/* account methods */

accountSchema.methods.get_transactions = function(id, cb) {
    const Transaction = require("./transaction");

    return Transaction.find({ account: id })
        .exec()
        .then(cb)
        .catch(error => console.log(error));
};


accountSchema.methods.get_total_expenses = async function(since = "this-month") {
    const Transaction = require("./transaction");
    let expenses = 0;

    try {
        /* spend this month, get all transactions for this account  */
        var transactions = await Transaction.find({account: this._id, type: "expense"}).select("type amount");
    } catch (error) {
        console.log(error);
    }

    transactions.forEach(trans => {expenses += trans.amount});
    return expenses;


};

accountSchema.methods.get_total_incomes = async function(since = "this-month") {

    const Transaction = require("./transaction");
    let incomes = 0;

    try {
        /* spend this month, get all transactions for this account  */
        var transactions = await Transaction.find({account: this._id, type: "income"}).select("type amount");
    } catch (error) {
        console.log(error);
    }

    transactions.forEach(trans => {incomes += trans.amount});

    return incomes;

};

accountSchema.methods.get_balance = function(id, cb) {};


module.exports = mongoose.model("account", accountSchema);
