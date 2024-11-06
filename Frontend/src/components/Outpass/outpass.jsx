import React, { useState } from "react";
import axios from "axios";
import "./Outpass.css";
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';

const Outpass = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    roll_no: "",
    where: "",
    dateOfArrival: "",
    reason: "",
    outTime: "",
    responsibility: "",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post data to the backend API
      const response = await axios.post("http://localhost:8000/user/apply", { formData }, { withCredentials: true });
      setModalMessage("Submission successful!");
      setIsModalOpen(true); // Open modal on success
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/"); // Redirect after closing modal
      }, 2000); // Auto-close after 2 seconds
    } catch (error) {
      console.log(error);
      setModalMessage("Submission Failed: " + (error.response?.data?.message || "An error occurred"));
      setIsModalOpen(true); // Open modal on error
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="box-outpass">
        <div className="sidepage-outpass">
          <h1 className="text-4xl font-bold mb-7 text-center animated-heading-outpass Generate-your-outpass">
            Generate your Outpass
          </h1>
          <div className="sidepage-outpass-img"></div>
        </div>
        <div className="cover-outpass">
          <div className="outpass-form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="roll_no">Roll Number</label>
                <input
                  type="text"
                  id="roll_no"
                  name="roll_no"
                  value={formData.roll_no}
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="where">Where</label>
                <input
                  type="text"
                  id="where"
                  name="where"
                  value={formData.where}
                  onChange={handleChange}
                  placeholder="Where are you going?"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="responsibility">Your responsibility</label>
                <input
                  type="text"
                  id="responsibility"
                  name="responsibility"
                  value={formData.responsibility}
                  onChange={handleChange}
                  placeholder="Your responsibility? -Yes/No"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfArrival">Date of Arrival</label>
                <input
                  type="date"
                  id="dateOfArrival"
                  name="dateOfArrival"
                  value={formData.dateOfArrival}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="outTime">Out Time</label>
                <input
                  type="time"
                  id="outTime"
                  name="outTime"
                  value={formData.outTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="reason">Reason</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Explain why you need an outpass"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal popup */}
      {isModalOpen && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <p className="text-center text-lg font-medium">{modalMessage}</p>
            <div className="text-center mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg">
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