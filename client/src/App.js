import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Header from "./Components/Header";
import CompanyTable from "./Components/CompanyTable";
import AddCompany from "./Components/AddCompany";
import EditCompany from "./Components/EditCompany";

const App = () => {
	return (
		<Router>
			<Header />

			<Switch>
				<React.Fragment>
					<Container>
						<Row style={{ marginTop: 20, padding: 10 }}>
							<Col md={12} className="text-center">
								<Route
									exact
									path="/"
									component={() => <Redirect to="home" />}
								/>
								<Route exact path="/home" component={CompanyTable}></Route>
								<Route exact path="/add" component={AddCompany}></Route>
								<Route exact path="/edit" component={EditCompany}></Route>
							</Col>
						</Row>
					</Container>
				</React.Fragment>
			</Switch>
		</Router>
	);
};

export default App;
