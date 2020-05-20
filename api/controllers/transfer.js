const mongoose = require("mongoose");
const Transfer = require("../models/transfer");
const Transaction = require("../models/transaction");

async function index(req, res, next) {

	try {

		const transfer = await Transfer
			//.find({ payment_month: { $gte: this_month} })
			.find()
			.populate('origin_account', 'name type')
			.populate('destination_account', 'name type')
			.sort({ createdAt: 'desc' })
			.limit(20)
			.select("-__v -user");
		//console.log(transfer);
		res.status(200).json(transfer);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error
		});
	}
}


async function create(req, res, next) {
	try {

		// When a transfer is made, two transactions are created:
		// One in the origin account and other one in the destination
		
		//create transfer
		const transfer = new Transfer({
			_id                : new mongoose.Types.ObjectId(),
			origin_account     : req.body.origin_account_id,
			destination_account: req.body.destination_account_id,
			amount             : req.body.amount,
			note               : req.body.note,
			user               : req.body.user_id,
		});
		const transferResult       = await transfer.save();

		
		if (transferResult["_id"]) {
			
			//create transaction for origin account
			const transactionIn = new Transaction({
				_id     : new mongoose.Types.ObjectId(),
				amount  : req.body.amount,
				type    : "transfer_in",
				note    : req.body.note,
				transfer: transferResult["_id"],
				account : req.body.destination_account_id,
				user    : req.body.user_id,
			});
	
			//create transaction for destination account
			const transactionOut = new Transaction({
				_id     : new mongoose.Types.ObjectId(),
				amount  : req.body.amount,
				type    : "transfer_out",
				note    : req.body.note,
				transfer: transferResult["_id"],
				account : req.body.origin_account_id,
				user    : req.body.user_id,
			});

			const transactionInResult  = transactionIn.save();
			const transactionOutResult = transactionOut.save();

			//get solved promises
			const promises = await Promise.all([	
				transactionInResult,
				transactionOutResult
			]);
			/* transferResult["transaction_in"]  = promises[0];
			transferResult["transaction_out"] = promises[1];
			console.log(transferResult)  */
		}


		res.status(201).json({
			success: true,
			message: "Transfer created",
			created_transfer: transferResult
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
	create
};
