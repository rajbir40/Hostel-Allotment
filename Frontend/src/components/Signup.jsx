import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import axios from 'axios';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to 'student'
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Post data to the backend API
      const response = await axios.post('http://localhost:8000/user/signup', { name, email, password, role });
      alert('Signup successful!');
      navigate('/login'); // Redirect to login or another page
    } catch (error) {
      alert('Signup failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <section className="bg-white">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleSignup} className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="flex justify-center mx-auto mb-4">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="Logo" />
          </div>

          <div className="flex items-center justify-center mt-6 mb-6">
            <a
              href="#"
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500">
              Sign Up
            </a>
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-10 focus:border-blue-400 focus:outline-none"
              placeholder="Username"
            />
          </div>

          <div className="relative flex items-center mt-6">
            <span className="absolute left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-10 focus:border-blue-400 focus:outline-none"
              placeholder="Email address"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-10 focus:border-blue-400 focus:outline-none"
              placeholder="Password"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute left-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-10 focus:border-blue-400 focus:outline-none"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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
    </section>
  );
}