import React from 'react';
import { Link } from 'react-router-dom';
import "./AdminDashboard.css"

export default function Sidebar() {
  return (
    <div>
      <nav>
        <div className="logo-name">
          <div className="logo-image">
            <img src="images/logo.png" alt=""/>
          </div>
          <span className="logo_name">DormSpace</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li><Link to="/adminpage/dashboard">
              <i className="uil uil-estate"></i>
              <span className="link-name">Dashboard</span>
            </Link></li>
            <li><Link to="/adminpage/roomrequests">
              <i className="uil uil-files-landscapes"></i>
              <span className="link-name">Booking Requests</span>
            </Link></li>
            <li><Link to="/adminpage/roominquiry">
              <i className="uil uil-chart"></i>
              <span className="link-name">Room Inquiry</span>
            </Link></li>
            <li><Link to="/adminpage/outpassrequest">
              <i className="uil uil-thumbs-up"></i>
              <span className="link-name">Outpass Requests</span>
            </Link></li>
            <li><Link to="#">
              <i className="uil uil-comments"></i>
              <span className="link-name">Comment</span>
            </Link></li>
            <li><Link to="#">
              <i className="uil uil-share"></i>
              <span className="link-name">Share</span>
            </Link></li>
          </ul>
          
          <ul className="logout-mode">
            <li><Link to="#">
              <i className="uil uil-signout"></i>
              <span className="link-name">Logout</span>
            </Link></li>
            <li className="mode">
              <Link to="#">
                <i className="uil uil-moon"></i>
                <span className="link-name">Dark Mode</span>
              </Link>
              <div className="mode-toggle">
                <span className="switch"></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
