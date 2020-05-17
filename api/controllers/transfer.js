const mongoose = require("mongoose");
const Transfer = require("../models/transfer");

async function index(req, res, next) {

	try {

		const transfer = await Transfer
			//.find({ payment_month: { $gte: this_month} })
			.find()
			//.populate('category', 'name')
			//.populate('account', 'name type')
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
		const transfer = new Transfer({
			_id                : new mongoose.Types.ObjectId(),
			origin_account     : req.body.origin_account_id,
			destination_account: req.body.destination_account_id,
			amount             : req.body.amount,
			note               : req.body.note,
			user               : req.body.user_id,
		});

		const result = await transfer.save();
		res.status(201).json({
			success: true,
			message: "Transaction created",
			created_transfer: result
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
