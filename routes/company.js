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

// public
// get all Companies
router.get("/", async (req, res) => {
	try {
		// get all Active Companies
		const companies = await Company.find({ isActive: true });
		return res.json(companies);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

// public
// get single company info
router.get("/:companyId", async (req, res) => {
	const { companyId } = req.params;

	// validate companyId
	if (!ObjectId.isValid(companyId))
		return res.status(400).json({ errors: [{ message: "Invalid CompanyId" }] });

	try {
		// find company
		let company = await Company.findOne({ _id: companyId });
		if (!company)
			return res
				.status(404)
				.json({ errors: [{ message: "Company Not Found" }] });

		// send to user
		return res.json(company);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

// public
// update specific company with id
router.put("/:companyId", async (req, res) => {
	// validate req body
	const { error } = validateUpdatedCompany(req.body);
	if (error) return res.status(400).json({ errors: error.details });

	try {
		let { companyId } = req.params;
		// check if company existed
		let company = await Company.findOne({ _id: companyId });

		if (!company)
			return res
				.status(404)
				.json({ errors: [{ message: "Company Not found" }] });

		// update company
		company = await Company.findByIdAndUpdate(company._id, req.body, {
			new: true
		});
		return res.json(company);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

// public
// (soft) delete specific company
router.delete("/:companyId", async (req, res) => {
	try {
		let { companyId } = req.params;

		// check if company existed
		let company = await Company.findOne({ _id: companyId });

		if (!company)
			return res
				.status(404)
				.json({ errors: [{ message: "Company Not found" }] });

		// (soft) delete company
		company = await Company.findByIdAndUpdate(company._id, { isActive: false });
		return res.json(company);
	} catch (err) {
		return res.status(500).json({ errors: [{ message: err.message }] });
	}
});

module.exports = router;
