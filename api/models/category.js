const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {
      type: String,
      required: [true, "No name provided"],
      trim: true
    },
    is_fixed_expense: {
        type: Boolean,
        default:false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "No user_id provided"]
    },
    usual_value: {
        type: Number,
        required: false
    }
  },

  { timestamps: {} }
);

module.exports = mongoose.model("category", categorySchema);
