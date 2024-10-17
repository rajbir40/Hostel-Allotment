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
      const response = await axios.post("http://localhost:8000/user/apply", {
        formData,
      }, { withCredentials: true });
      alert("Submission successful!");
      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        "Submission Failed" +
        (error.response?.data?.message || "An error occurred")
      );
    }
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
          {/* <h2>Outpass Form</h2> */}
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
              <label htmlFor="where">where</label>
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
              <label htmlFor="dateOfArrival">dateOfArrival</label>
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
    </div>
  );
};

export default Outpass;
