import React from "react";
import { Alert } from "react-bootstrap";

const Error = ({ errors }) => {
	return errors.map((e, idx) => (
		<Alert key={idx} variant={"danger"}>
			{e.message}
		</Alert>
	));
};
export default Error;
