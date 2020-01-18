import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

import Error from "./Error";
const EditCompany = ({ history }) => {
	const { code, name, address, _id } = history.location.state[0].data;
	// console.log("edit history", history.location.state[0].data);
	const [validated, setValidated] = useState(false);
	const [errors, setErrors] = useState([]);

	const handleSubmit = async event => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();
		if (form.checkValidity()) {
			let { name, code, address } = form.elements;

			const companyData = {
				name: name.value,
				code: code.value,
				address: address.value
			};
			try {
				const { data } = await axios.put(
					`http://localhost:5000/api/company/${_id}`,
					companyData
				);
				if (data.status === 200) {
					setValidated(true);
					history.push("/");
				} else {
					setErrors(data.errors);
					setValidated(false);
				}
			} catch (err) {
				setErrors([{ message: err.message }]);
				setValidated(false);
			}
		}
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			{errors.length ? <Error errors={errors} /> : null}
			<Form.Group controlId="CompanyName">
				<Form.Label>Company Name</Form.Label>
				<Form.Control name="name" type="text" defaultValue={name} />
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Invalid Name
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group controlId="CompanyAddress">
				<Form.Label>Company Address</Form.Label>
				<Form.Control name="address" type="text" defaultValue={address} />
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Invalid Address
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group controlId="CompanyCode">
				<Form.Label>Company Code</Form.Label>
				<Form.Control name="code" type="text" defaultValue={code} />
				<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
				<Form.Control.Feedback type="invalid">
					Invalid Code
				</Form.Control.Feedback>
			</Form.Group>
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default EditCompany;
