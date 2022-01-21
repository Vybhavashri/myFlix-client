import React from "react";
import { Navbar, Container, Nav, Button, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navbar-view.scss";

function NavBarView() {
  const user = localStorage.getItem("user");

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  return (
    <Navbar className="navbar" variant="dark" expand="lg md" fixed="top" align="center">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto navbar-menu">
            <NavItem>
              Logged in as: <Link to={`/users/${user}`} >{user}</Link>
            </NavItem>
          </Nav>
          <Nav.Link className="d-flex">
            <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarView;