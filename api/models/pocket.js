const mongoose = require("mongoose");

const pocketSchema = mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        name: {
            type: String,
            trim: true,
            required: [true, "No pocket provided"],
        },
        amount: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            trim: true
        },
        account: {
            type: mongoose.Types.ObjectId,
            ref: "account",
            required: [true, "No account_id provided"],
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, "No user_id provided"],
        },
    },
    {
        timestamps: {},
    }
);

module.exports = mongoose.model("pocket", pocketSchema);
