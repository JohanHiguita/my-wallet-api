const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {
      type: String,
      required: [true, "No name provided"],
      trim: true
    },
    type: {
        type: String,
        enum: ['cash', 'savings', "credit card"],
        required: [true, "No type provided"],
    },
  },

  { timestamps: {} }
);

/* account methods */

accountSchema.methods.get_balance = function(id, cb) {
   /*  const Payment = require("./payment");

    return Payment.find({ project: id })
      .select("-__v")
      .exec()
      .then(cb)
      .catch(error => console.log(error)); */
  };

  accountSchema.methods.get_total_incomes = function (id, cb){

  }

  accountSchema.methods.get_total_expenses = function (id, cb){

  }

module.exports = mongoose.model("account", accountSchema);
