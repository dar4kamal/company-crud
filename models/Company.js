const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		minlength: 3,
		unique: true
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

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
