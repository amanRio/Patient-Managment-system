import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

export default function HorizontalNavbar() {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    
    // logout endpoint
    setAuth({});
    localStorage.clear();
    navigate("/");
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Patient Data Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown
              title={auth?.username}
              bg="dark"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                className="text-dark"
                onClick={() => {
                  logout();
                }}
              >
                logout
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="">Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
