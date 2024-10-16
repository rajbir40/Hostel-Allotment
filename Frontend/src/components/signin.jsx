import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  './signin.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:8000/user/login', { email, password }, { withCredentials: true });
      console.log(response)
      alert('Login successful!');
      localStorage.setItem('user', JSON.stringify(response.data.id));
      navigate('/')
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.response?.data?.message || 'An error occurred');
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <section>
      <div className='login-main'>
        <div className='sidebar-login'>
          <h1>Welcome to DormSpace!</h1>
        </div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg  form-box-login">
         

          <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8">
            <p className="text-center text-lg font-medium">Sign in to your account</p>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <div className="relative">
                <input
                  type="email"
                  id="name"
                  className="w-full rounded-lg bg-gray-200 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-lg bg-gray-200 border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <a className="underline" href="/forgot-password">Forgot password?</a>
              <p>
                No account? <a className="underline" href="/signup">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      </div>
      
    </section>
  );
}
