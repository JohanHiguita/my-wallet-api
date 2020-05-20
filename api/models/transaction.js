const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
	{
		_id: mongoose.Types.ObjectId,
		amount: {
			type: Number,
			required: [true, "No amount provided"]
		},
		note: {
			type: String,
			trim: true
		},
		payment_month: {
			type: Date,
			default: Date.now
		},
		type: {
			type: String,
			enum: ['income', 'expense', 'transfer_in', 'transfer_out'],
			required: [true, "No type provided"]
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "user",
			required: [true, "No user_id provided"]
		},
		category: {
			type: mongoose.Types.ObjectId,
			ref: "category",
		},
		account: {
			type: mongoose.Types.ObjectId,
			ref: "account",
			required: [true, "No account_id provided"]
		},
		transfer: {
			type: mongoose.Types.ObjectId,
			ref: "transfer"
		}
	},

	{ timestamps: {} }
);

/* validation */

/* project validations  */

/* paymentSchema.pre("save", async function(next) {
  // Validate project val vs leftover
  const Project = require("./project");
  try {
    let project = await Project.findById(this.project);
    if (project) {
      const status_obj = await project.get_status();
      if (this.value > status_obj.leftover) {
        const error = {
          message:
            "Pay value is greater than the leftover value of the project (add values)"
        };
        next(error); // If you call `next()` with an argument, that argument is assumed to be an error.
      }
      next(); //Pass the validation
    } else {
      //Validate if the project exists
      throw `The project ${this.project} does not exist`;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});*/
module.exports = mongoose.model("transaction", transactionSchema);
