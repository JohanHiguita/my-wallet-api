const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    email: {
        type: String,
        required: [true, "No email provided"],
        trim: true
      },
    name: {
      type: String,
      required: [true, "No name provided"],
      trim: true
    }
  },

  { timestamps: {} }
);

module.exports = mongoose.model("user", categorySchema);
