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
    <section className="flex items-center justify-center min-h-screen bg-gray-100"
    style={{
      background:
        'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)',
    }}
    >
    <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-md bg-white rounded-lg shadow-lg p-10">
        <h1 className="text-center text-3xl font-bold text-indigo-600 sm:text-4xl">
          Logout
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-center text-gray-500 text-lg">
          Are you sure you want to log out?
        </p>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleLogout}
            className="block w-full rounded-lg px-6 py-4 text-base font-medium text-white"
            style={{
              background:
                'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)',
            }}
          >
            Logout
          </button>

          <div className="flex justify-center items-center mt-6 text-base text-gray-500">
            <p>
              Go back to{' '}
              <a className="underline text-indigo-600" href="/">
                Home
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
