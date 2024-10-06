import React, { useState ,useRef} from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
            <a href="/"><h1>DormSpace</h1></a>
            </div>
          
            <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
                <a href="/"><div className="nav-item">Home</div></a>
                <a><div className="nav-item">Hostel Allotment</div></a>
                <a href="/outpass"><div className="nav-item">Outpass</div></a>
                <div className="nav-item">Logout</div>
                <a href="/profile" ><div className="nav-item">Profile</div></a>
                {/* <a href="/outpass"></a><div className="nav-item">Logout</div>
                <div className="nav-item">Profile</div> */}
                
                
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <span className="bar">Logout</span>
                <span className="bar">Profile</span>
                <span className="bar"></span>
            </div>
        </nav>
    );
}

export default Navbar;
