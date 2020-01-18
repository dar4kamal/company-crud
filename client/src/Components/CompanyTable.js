import React from "react";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import CompanyItem from "./CompanyItem";
import Error from "./Error";

class CompanyTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			companies: [],
			error: false,
			errors: [],
			loading: true
		};
	}

	async componentDidMount() {
		const { data } = await axios.get("http://localhost:5000/api/company");

		if (data.status === 200)
			this.setState({ companies: data.data, loading: false });
		else this.setState({ error: true, errors: data.errors });
	}

	onRemoveDone = companyId => {
		let { companies } = this.state;
		this.setState({ companies: companies.filter(c => c._id !== companyId) });
	};
	render() {
		const { companies, error, errors, loading } = this.state;
		const { history } = this.props;
		return error ? (
			<Error errors={errors} />
		) : !loading && companies.length ? (
			<Table responsive>
				<thead>
					<tr>
						<th>Name</th>
						<th>Address</th>
						<th>Code</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{companies.map(c => (
						<CompanyItem
							key={c.code}
							data={c}
							onRemoveDone={this.onRemoveDone}
							history={history}
						/>
					))}
				</tbody>
			</Table>
		) : !loading ? (
			<Alert variant={"secondary"}>There are no companies right now ....</Alert>
		) : (
			<Alert variant={"secondary"}>Loading ....</Alert>
		);
	}
}

export default CompanyTable;
