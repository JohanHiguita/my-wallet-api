const mongoose = require("mongoose");
const Transaction = require("../models/transaction");

/* add expenses, incomes and balance */
async function add_extra_props(accounts) {

    const modified_accounts = []
    let incomes  = expenses = 0;
    for (i = 0; i < accounts.length; i++) {
        const account_id = accounts[i]["_id"];
        try {
            /* spend this month, get all transactions for this account  */
            var transactions = await Transaction.find({account: account_id}).select("type amount");
        } catch (error) {
            console.log(error);
        }

        transactions.forEach(trans => {
            if (trans.type == "income") {
                incomes += trans.amount
                //console.log(trans.type, incomes)
            }else if (trans.type == "expense") {
                expenses += trans.amount
                //console.log(trans.type, expenses)
            }
        });

        const balance = incomes - expenses
        accounts[i] = accounts[i].toObject(); //mongoose objects does not allow change props

        accounts[i]["incomes"] = incomes;
        accounts[i]["expenses"] = expenses;
        accounts[i]["balance"] = balance;
        incomes = expenses = 0; //reset values


    }
    return accounts;
}

module.exports = {
    add_extra_props
};
