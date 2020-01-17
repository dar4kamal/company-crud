const router = require("express").Router();
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

const {
	validateNewCompany,
	validateUpdatedCompany
} = require("../validation/company");
const Company = require("../models/Company");

// public
// add new company
router.post("/", async (req, res) => {
	// validate req body
	const { error } = validateNewCompany(req.body);
	if (error) return res.status(400).json({ errors: error.details });

	let { code, name, address } = req.body;

	try {
		// check if company existed
		let company = await Company.findOne({ code });

		if (company) {
			return res
				.status(400)
				.json({ errors: [{ message: "Company Already Existed" }] });
		}

		// add new company
		company = await Company.create({
			code,
			name,
			address
		});
		return res.json(company);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

module.exports = router;
