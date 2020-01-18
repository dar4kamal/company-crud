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
	if (error) return res.json({ status: 400, errors: error.details });

	let { code, name, address } = req.body;

	try {
		// check if company existed
		let company = await Company.findOne({ address });

		if (company && !company.isActive) {
			return res.json({
				status: 400,
				errors: [{ message: "Company Already Existed But Not Active" }]
			});
		}
		if (company) {
			return res.json({
				status: 400,
				errors: [{ message: "Company Already Existed" }]
			});
		}

		// add new company
		company = await Company.create({
			code,
			name,
			address
		});
		return res.json({ status: 200, data: company });
	} catch (err) {
		return res.json({ status: 500, errors: [{ message: err.message }] });
	}
});

// public
// get all Companies
router.get("/", async (req, res) => {
	try {
		// get all Active Companies
		const companies = await Company.find({ isActive: true });
		return res.json({ status: 200, data: companies });
	} catch (err) {
		return res.json({ status: 500, errors: [{ message: err.message }] });
	}
});

// public
// get single company info
router.get("/:companyId", async (req, res) => {
	const { companyId } = req.params;

	// validate companyId
	if (!ObjectId.isValid(companyId))
		return res.json({
			status: 400,
			errors: [{ message: "Invalid CompanyId" }]
		});

	try {
		// find company
		let company = await Company.findOne({ _id: companyId });
		if (!company)
			return res.json({
				status: 400,
				errors: [{ message: "Company Not Found" }]
			});

		// send to user
		return res.json({ status: 200, data: company });
	} catch (err) {
		return res.json({ status: 500, errors: [{ message: err.message }] });
	}
});

// public
// update specific company with id
router.put("/:companyId", async (req, res) => {
	// validate req body
	const { error } = validateUpdatedCompany(req.body);
	if (error) return res.json({ status: 400, errors: error.details });

	try {
		const { address } = req.body;
		let { companyId } = req.params;
		// check if company existed
		let company = await Company.findOne({ _id: companyId });

		if (!company)
			return res.json({
				status: 404,
				errors: [{ message: "Company Not found" }]
			});

		// check if another company existed with the same new addres
		let anotherCompany = await Company.findOne({
			address,
			_id: { $ne: companyId }
		});

		if (anotherCompany) {
			return res.json({
				status: 400,
				errors: [
					{ message: "Another Company Already Existed With Same Address ..." }
				]
			});
		}

		// update company
		company = await Company.findByIdAndUpdate(company._id, req.body, {
			new: true
		});
		return res.json({ status: 200, data: company });
	} catch (err) {
		return res.json({ status: 500, errors: [{ message: err.message }] });
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
			return res.json({
				status: 404,
				errors: [{ message: "Company Not found" }]
			});

		// (soft) delete company
		company = await Company.findByIdAndUpdate(
			company._id,
			{ isActive: false },
			{
				new: true
			}
		);
		return res.json({ status: 200, data: company });
	} catch (err) {
		return res.json({ status: 500, errors: [{ message: err.message }] });
	}
});

module.exports = router;
