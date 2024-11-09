import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserRound, FileOutput, HomeIcon, Search } from "lucide-react";
// import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const Outpass = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    reason: "",
    startDate: "",
    endDate: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to backend or API
    console.log(formData);
  };

  return (
    <div>
      <Navbar />
      <div className="lg:ml-16 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Issue Outpass</h1>
          <div className="relative w-64">
            {/* Optional search or filter input */}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg w-full max-w-7xl p-8 mx-32 flex">
        <div className="w-2/3 pr-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Reason for Outpass</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 mb-1">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              Submit Outpass
            </button>
          </form>
        </div>
        <div className="w-1/3 bg-gray-800 text-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Outpass Requirements</h3>
          <ul className="space-y-2">
            <li>Provide a valid reason for leaving the campus</li>
            <li>Include accurate start and end dates</li>
            <li>Ensure contact number is reachable</li>
            <li>Only one outpass is allowed per request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Outpass;
