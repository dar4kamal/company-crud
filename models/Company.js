const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		minlength: 3
	},
	name: {
		type: String,
		minlength: 3,
		required: true
	},
	address: {
		type: String,
		minlength: 3,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	}
});

companySchema.index({ address: 1, isActive: 1 }, { unique: true });

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
