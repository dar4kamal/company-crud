const Joi = require("@hapi/joi");

const validateNewCompany = comapny => {
	const schema = Joi.object().keys({
		code: Joi.string().required(),
		name: Joi.string()
			.min(3)
			.required(),
		address: Joi.string()
			.min(3)
			.required()
	});

	return schema.validate(comapny);
};

const validateUpdatedCompany = company => {
	const schema = Joi.object().keys({
		code: Joi.string(),
		name: Joi.string().min(3),
		address: Joi.string().min(3),
		isActive: Joi.boolean()
	});

	return schema.validate(company);
};

module.exports = {
	validateNewCompany,
	validateUpdatedCompany
};
