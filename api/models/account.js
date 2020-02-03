const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {
      type: String,
      required: [true, "No name provided"],
      trim: true
    }
  },

  { timestamps: {} }
);

module.exports = mongoose.model("account", accountSchema);
