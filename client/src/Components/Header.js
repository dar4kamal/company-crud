import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
			<Navbar.Brand as={Link} to="/">
				Companies Panel
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={NavLink} to="/add">
						Add Company
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
export default Header;
