import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.jpg'; // Importing logo image

const Navbar = () => {
  return (
    <div>
        {/* Navigation Bar */}
            <nav
            className="navbar navbar-expand-lg fixed-top" // Bootstrap navbar with fixed position
            style={{ backgroundColor: '#63c9f9', padding: '0.25rem 0' }} // Custom background and padding
            >
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center fw-semibold" to="/" style={{color:'#0000ff'}}>
                        <img src={logo} alt="NovaGuide Logo" width="30" height="28" className="d-inline-block align-text-top me-3" />
                        NovaGuide
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Navigation Links */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/pricing">Price</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
    </div>
     
  );
};

export default Navbar;
