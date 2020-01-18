import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import axios from "axios";

const CompanyItem = ({ data, history, onRemoveDone }) => {
	const { name, code, address, _id } = data;

	const onRemove = async history => {
		const company = await axios.delete(
			`http://localhost:5000/api/company/${_id}`
		);
		if (company) {
			onRemoveDone(_id);
			history.push("/");
		}
	};

	const onEdit = history => {
		history.push("/edit", [{ data }]);
	};

	return (
		<tr>
			<td>{name}</td>
			<td>{address}</td>
			<td>{code}</td>

			<td>
				<ButtonToolbar aria-label="Toolbar with button groups">
					<ButtonGroup className="mr-2 ">
						<Button
							onClick={() => onEdit(history)}
							variant="primary"
							style={{ marginRight: 5 }}
							size="sm"
						>
							Edit
						</Button>
					</ButtonGroup>
					<ButtonGroup className="mr-2 ">
						<Button
							onClick={() => onRemove(history)}
							variant="danger"
							style={{ marginRight: 5 }}
							size="sm"
						>
							delete
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</td>
		</tr>
	);
};

export default CompanyItem;
