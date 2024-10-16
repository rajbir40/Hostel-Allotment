import React, { useState, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx'; // Import the UserContext

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(UserContext); // Use the UserContext to get user and logout function

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/"><h1>DormSpace</h1></a>
            </div>

            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <Link to="/"><div className="nav-item">Home</div></Link>
                <Link to="/selection"><div className="nav-item">Hostel Allotment</div></Link>
                <Link to="/outpass"><div className="nav-item">Outpass</div></Link>
                <Link to="/profile"><div className="nav-item">Profile</div></Link>

                {/* Conditional rendering for Login/Logout */}
                {user ? (
                    <a href='/logout'><div className="nav-item" onClick={logout}>Logout</div></a>
                ) : (
                    <Link to="/login"><div className="nav-item">Login</div></Link>
                )}
            </div>

            {/* Mobile toggle button */}
            <div className="navbar-toggle" onClick={toggleMenu}>
                {user ? (
                    <div className="nav-item" onClick={logout}>Logout</div>
                ) : (
                    <Link to="/login"><span className="bar">Login</span></Link>
                )}
                <span className="bar">Profile</span>
                <span className="bar"></span>
            </div>
        </nav>
    );
}

export default Navbar;
