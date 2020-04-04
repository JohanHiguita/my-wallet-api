const mongoose = require("mongoose");

const configSchema = mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, "No user_id provided"]
        },
        budget: {
            type: Number
        }
    },

    { timestamps: {} }
);

/* account methods */

module.exports = mongoose.model("config", configSchema);
