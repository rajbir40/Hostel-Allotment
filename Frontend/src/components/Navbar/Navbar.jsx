import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { UserContext } from '../../context/UserContext.jsx';

const serverURL = "http://localhost:8000";

export default function NavbarTest() {
  // State to handle menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  
  const [role, setRole] = useState(null); // Set role as a state variable
  const [studentId, setStudentId] = useState(null);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
          setStudentId(savedUser.id); // Update with correct field if different

          const response = await axios.get(`${serverURL}/user/student/${savedUser}`);
          const userData = response.data;
          setRole(userData.role); // Set the user role
        } else {
          console.error("No user data found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black" style={{ color: 'blue' }}>
            DormSpace
          </span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <Link to="/" className="block py-2 px-3 text-black bg-white rounded md:bg-transparent md:text-black md:p-0" aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link to="/selection" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Hostel Allotment
              </Link>
            </li>
            <li>
              <Link to="/outpass" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Outpass
              </Link>
            </li>
            <li>
              <Link to="/newprofile" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                Profile
              </Link>
            </li>
            {role === "admin" ? (
              <li>
                <Link to="/adminpage/dashboard" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Admin Dashboard
                </Link>
              </li>
            ) : (
              <></>
            )}
            <li>
              {user ? (
                <a href="/logout" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0" onClick={logout}>
                  Logout
                </a>
              ) : (
                <Link to="/login" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
