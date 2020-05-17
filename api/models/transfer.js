const mongoose = require("mongoose");

const transferSchema = mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        origin_account: {
          type: mongoose.Types.ObjectId,
          ref: "account",
          required: [true, "No origin_account_id provided"]
        },
        destination_account: {
          type: mongoose.Types.ObjectId,
          ref: "account",
          required: [true, "No destination_account_id provided"]
        },
        amount: {
            type: Number,
            required: [true, "No amount provided"]
        },
        note: {
            type: String,
            trim: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, "No user_id provided"]
        }
    },
    { timestamps: {} }
);

module.exports = mongoose.model("transfer", transferSchema);
