import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; // Import the modal component
import './Signup.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to 'student'
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Modal message
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Post data to the backend API
      const response = await axios.post('http://localhost:8000/user/signup', { name, email, password, role, address, dob, phoneNumber });
      setModalMessage('Signup successful!'); // Set success message
      setModalOpen(true); // Show modal
    } catch (error) {
      setModalMessage('Signup failed: ' + (error.response?.data?.message || 'An error occurred'));
      setModalOpen(true); // Show modal on error
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (modalMessage === 'Signup successful!') {
      navigate('/login'); // Navigate to login page after successful signup
    }
  };

  return (
    <section>
      <div className='main-signup'>
        <div className='form-signup '>
          <form onSubmit={handleSignup} className="w-full max-w-md bg-white-100  rounded-lg signup-box">
            <div className="flex justify-center mx-auto mb-4">
              <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
            </div>

            <div className="flex items-center justify-center mt-6 mb-6 ">
              <a
                href="#"
                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500">
                Sign Up
              </a>
            </div>

            <div className="relative flex items-center mt-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg focus:border-blue-400 focus:outline-none"
                placeholder="Username"
              />
            </div>

            <div className="relative flex items-center mt-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-3 focus:border-blue-400 focus:outline-none"
                placeholder="Email address"
              />
            </div>

            <div className="relative flex items-center mt-6">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-3 focus:border-blue-400 focus:outline-none"
                placeholder="Address"
              />
            </div>

            <div className="relative flex items-center mt-6">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-3 focus:border-blue-400 focus:outline-none"
                placeholder="Date of birth"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setNumber(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-10 focus:border-blue-400 focus:outline-none"
                placeholder="Phone Number"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-3 focus:border-blue-400 focus:outline-none"
                placeholder="Password"
              />
            </div>

            <div className="relative flex items-center mt-4">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-3 focus:border-blue-400 focus:outline-none"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                style={{
                  background: 'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)',
                }}
              >
                Sign Up
              </button>

              <div className="mt-6 text-center">
                <a href="/login" className="text-sm text-blue-500 hover:underline">
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
        </div>

        <div className='sidebar-signup'>
          <h1>SignUp to DormSpace!</h1>
        </div>
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} handleClose={closeModal} message={modalMessage} />
    </section>
  );
}
