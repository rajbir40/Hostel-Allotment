import React from 'react';
import { useState, useEffect } from 'react';
import '../Profile/Profile.css';
import Sidebar from './Sidebar';

export default function AdminProfile() {
  const host = 'http://localhost:8000';
  const [admin, setAdmin] = useState({});

  const fetchAdmin = async () => {
    const id = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${host}/getuser/student/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setAdmin(data);
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <>
      <Sidebar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 style={{ fontWeight: 'bolder', fontSize: '24px', color: 'blue' }}>Admin Profile</h2>
        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{admin.username}</h2>
          <p className="text-gray-500">{admin.email}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Username</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{admin.name}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <div className="flex items-center">
              <span className="text-blue-500 underline">{admin.email}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Address</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{admin.address}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Contact No.</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{admin.phoneNumber}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">DOB</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{admin.dob}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}