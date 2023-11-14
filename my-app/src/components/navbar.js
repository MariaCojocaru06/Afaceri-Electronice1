import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importați Link din React Router
import { Basket2 } from "react-bootstrap-icons";
import Cart from "./cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavigationBar = () => {
    const [cart, setCart] = useState([]);
    const isAdmin=localStorage.getItem("isAdmin")
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const handleLogout = () => {
    // Sterge toate datele din localStorage
    localStorage.clear();
    // Setează starea loggedIn la false
    setLoggedIn(false);
    toast.success("Delogare cu succes!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
  window.location.href = "http://localhost:3002/"
    // Poate redirecționa utilizatorul la pagina de autentificare sau altă pagină dorită
    // window.location.href = "/login";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand to="/">ToyStore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Acasa</Nav.Link>
          <Nav.Link href="/product">Produse</Nav.Link>
          <Nav.Link href="/cart"></Nav.Link>
          
        </Nav>

        {loggedIn ? (
          <Button variant="primary"  onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button variant="primary" href="/login">
            Log In
          </Button>
        )}
        {isAdmin  ?(
          <Button href="/admin"className="ml-auto">Admin</Button>

        ):''}
        <Button  href="/cart"className="ml-auto">
          {" "}
          {/* Add this div for right alignment */}
          <Basket2  href="/cart"size={20} />
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
