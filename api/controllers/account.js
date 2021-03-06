const mongoose = require("mongoose");
const Account = require("../models/account");

async function index(req, res, next) {
    const since = req.body.since;
    try {
        let accounts = await Account.find().select("-__v");
        var _accounts = []; //modified accounts to return

        for (let i = 0; i < accounts.length; i++) {
            const account = accounts[i];
            //here use promise all
            const expenses = await account.get_total_expenses(since);
            const incomes = await account.get_total_incomes(since);
            const total = await account.get_total(since);
            const balance = incomes - expenses;

            const _account = account.toObject(); //mongoose objects does not allow change props
            _account["expenses"] = expenses;
            _account["incomes"] = incomes;
            _account["balance"] = balance;
            _account["total"] = total;
            _accounts.push(_account);
        }

        //console.log(_accounts)
        res.status(200).json(_accounts);
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

            //use promise.all
            const expenses = await account.get_total_expenses();
            const incomes = await account.get_total_incomes();
            const balance = incomes - expenses;

            const _account = account.toObject(); //mongoose objects does not allow change props

            if(account.type == "savings") {
                const pockets = await account.getPockets()
                _account["pockets"] = pockets;
            }
            _account["expenses"] = expenses;
            _account["incomes"] = incomes;
            _account["balance"] = balance;

            res.status(200).json(_account);
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
