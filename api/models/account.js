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


accountSchema.methods.get_total_expenses = async function(from,to) {
    const Transaction = require("./transaction");
    let expenses = 0;
    let transactions;

    try {
        /* spend this month, get all transactions for this account  */
        transactions = await Transaction.find({account: this._id, type: "expense"}).select("type amount");
    } catch (error) {
        console.log(error);
    }

    transactions.forEach(trans => {expenses += trans.amount});
    return expenses;


};

accountSchema.methods.get_total_incomes = async function(from,to) {

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

accountSchema.methods.get_total = async function(from,to) {

    const Transaction = require("./transaction");
    let total = 0;
    let transactions;

    try {
        /* spend this month, get all transactions for this account  */
        //var transactions = await Transaction.find({ account: this._id, $or:[{type: "income"}, {type: "transfer_in"}] }).select("type amount");
        transactions = await Transaction.find({ account: this._id}).select("type amount");
        //$or: [{ name: "Rambo" }, { breed: "Pugg" }, { age: 2 }] 
    } catch (error) {
        console.log(error);
    }

    transactions.forEach(trans => {

        if(trans.type === "transfer_in" || trans.type === "income"){
            total += trans.amount;
        } else if (trans.type === "transfer_out" || trans.type === "expense"){
            total -= trans.amount;
        }

        //return total;
    });
    return total;

};

accountSchema.methods.getPockets = async function() {

    const Pocket = require("./pocket");

    try {
        /* spend this month, get all transactions for this account  */
        const pockets = await Pocket.find({account: this._id}).select("name amount description");
        return pockets;
    } catch (error) {
        console.log(error);
    }



};


module.exports = mongoose.model("account", accountSchema);
