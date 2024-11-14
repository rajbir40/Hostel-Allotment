import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Calendar, Clock, MapPin, User, UserCheck, FileText, AlertCircle } from "lucide-react";

const serverURL = "http://localhost:8000";

const Outpass = () => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState(null);
  const [rollNum, setRollNum] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    where: "",
    dateOfArrival: "",
    reason: "",
    outTime: "",
    responsibility: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedStudentId = JSON.parse(localStorage.getItem("user"));
        if (!storedStudentId) {
          console.error("No student ID found in local storage.");
          return;
        }

        setStudentId(storedStudentId);
        const response = await axios.get(`${serverURL}/user/student/${storedStudentId}`);
        const user = response.data;
        setRollNum(user.enrollmentId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = { ...formData, roll_no: rollNum };
      await axios.post(`${serverURL}/user/apply`, dataToSend, { withCredentials: true });

      setModalMessage("Submission successful!");
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Submission Error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during submission.";
      setModalMessage(`Submission Failed: ${errorMessage}`);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                    Your Responsibility
                  </label>
                  <input
                    type="text"
                    id="responsibility"
                    name="responsibility"
                    value={formData.responsibility}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your responsibility? - Yes/No"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                {modalMessage.includes("Failed") ? (
                  <AlertCircle className="w-6 h-6 text-red-500" />
                ) : (
                  <UserCheck className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900">{modalMessage}</h3>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Outpass;
