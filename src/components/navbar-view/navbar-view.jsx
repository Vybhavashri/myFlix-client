import React from "react";
import { Navbar, Container, Nav, Button, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBarView() {
  const user = localStorage.getItem("user");

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const home = () => {
    window.open("/", "_self")
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link className="d-flex">
              <Button variant="light" className="button" onClick={() => { home() }}>MyFlix</Button>
            </Nav.Link>
          </Navbar.Brand>
          <NavItem className="text-white">
            Edit Profile : <Link size="lg" to={`/users/${user}`}>{user}</Link>
          </NavItem>
          <Nav.Link className="d-flex">
            <Button variant="primary" className="btn-primary" onClick={() => { onLoggedOut() }}>Logout</Button>
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarView;