import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart } from "../store/slices/cart.slice";
import Sidebar from "./Sidebar";
import "../styles/navbar.css";

const NavBar = () => {
  const logout = localStorage.getItem("token", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <Navbar className="nav-bar" expand="lg">
        <Container>
          <Navbar.Brand href="/#/">Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/login"> Login</Nav.Link>
              <Nav.Link href="/#/purchase">Purchase</Nav.Link>
              <Nav.Link role="button" onClick={handleShow}>
                Cart (Sidebar)
              </Nav.Link>
              <Nav.Link role="button" onClick={logout}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Sidebar show={show} handleClose={handleClose} />
    </div>
  );
};

export default NavBar;
