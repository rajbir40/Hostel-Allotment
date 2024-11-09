import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import { Calendar, Clock, MapPin, User, UserCheck, FileText, AlertCircle } from 'lucide-react';
const serverURL = 'http://localhost:8000'

const Outpass = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState();
  const [rollNum, setRollNum] = useState("");
  const [formData, setFormData] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    responsibility: "no", // Default 'no'
    vehicle: "",
    reason: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedStudentId = JSON.parse(localStorage?.getItem('user'));
        setStudentId(storedStudentId);
        if (storedStudentId) {
          const response = await axios.get(`${serverURL}/user/student/${storedStudentId}`);
          const user = response.data;
          setRollNum(user.enrollmentId);
        } else {
          console.error("No student ID found in local storage.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...formData, roll_no: rollNum };
      
      const response = await axios.post("http://localhost:8000/user/apply", dataToSend, { withCredentials: true });
      setModalMessage("Submission successful!");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setModalMessage("Submission Failed: " + (error.response?.data?.message || "An error occurred"));
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Form heading and image */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center">
              Generate your Outpass
            </h1>
            <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg shadow-lg flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-lg"></div>
              <FileText className="w-24 h-24 text-blue-500" />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
{/* 
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="roll_no"
                    name="roll_no"
                    value={formData.roll_no}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your roll number"
                    required
                  />
                </div> */}

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    Where
                  </label>
                  <input
                    type="text"
                    id="where"
                    name="where"
                    value={formData.where}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Where are you going?"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Your responsibility
                  </label>
                  <input
                    type="text"
                    id="responsibility"
                    name="responsibility"
                    value={formData.responsibility}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your responsibility? -Yes/No"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Date of Arrival
                    </label>
                    <input
                      type="date"
                      id="dateOfArrival"
                      name="dateOfArrival"
                      value={formData.dateOfArrival}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                      <Clock className="w-4 h-4 mr-2" />
                      Out Time
                    </label>
                    <input
                      type="time"
                      id="outTime"
                      name="outTime"
                      value={formData.outTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Reason
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                    placeholder="Explain why you need an outpass"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Submit Outpass Request
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg w-full max-w-7xl p-8 mx-32 flex">
        <div className="w-2/3 pr-6">
          <form onSubmit={handleSubmit}>
            {/* Start Date */}
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

            {/* Start Time */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            {/* End Date */}
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

            {/* End Time */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            {/* Your Responsibility (Yes/No) */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Your Responsibility</label>
              <select
                name="responsibility"
                value={formData.responsibility}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Vehicle */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Vehicle</label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            {/* Reason for Outpass */}
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
            <li>Include accurate start and end dates and times</li>
            <li>Ensure contact number is reachable</li>
            <li>Only one outpass is allowed per request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Outpass;
