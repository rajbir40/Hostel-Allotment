import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import axios from 'axios';
import './Signup.css';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default to 'student'
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Post data to the backend API
      const response = await axios.post('http://localhost:8000/user/signup', { name, email, password, role ,address, dob});
      alert('Signup successful!');
      navigate('/login'); // Redirect to login or another page
    } catch (error) {
      alert('Signup failed: ' + (error.response?.data?.message || 'An error occurred'));
    }
  };

  return (
    <section >
      <div className='main-signup'>
       
        <div className='form-signup'>
        <form onSubmit={handleSignup} className="w-full max-w-md bg-white-100 p-6 rounded-lg ">
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

          <div className="relative flex items-center mt-6">
            <span className="absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z" />
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

          <div className="relative flex items-center mt-6">
            <span className="absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-10 focus:border-blue-400 focus:outline-none"
              placeholder="Address"
            />
          </div>

          <div className="relative flex items-center mt-6">
            <span className="absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>

            </span>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="block w-full py-3 text-gray-700 bg-gray-200 border rounded-lg pl-10 focus:border-blue-400 focus:outline-none"
              placeholder="Date of birth"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute left-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
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
        <h1>Welcome to DormSpace!</h1>
        </div>
      </div>
     
    </section>
  );
}