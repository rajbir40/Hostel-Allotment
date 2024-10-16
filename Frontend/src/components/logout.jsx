import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to the backend to logout and clear the authentication cookie
      const response = await axios.post('http://localhost:8000/user/logout', {}, { withCredentials: true });
      console.log(response.data.message);
      localStorage.removeItem('user');
      // Show a success message and redirect to the login page
      alert('Logout successful!');
      navigate('/login');
    } catch (error) {
      // Handle logout error
      console.error('Logout failed:', error.response?.data?.message || 'An error occurred');
      alert(error.response?.data?.message || 'An error occurred during logout');
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Logout</h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Are you sure you want to log out?
          </p>

          <div className="mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
            <button
              onClick={handleLogout}
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Logout
            </button>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <p>
                Go back to <a className="underline" href="/">Home</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
