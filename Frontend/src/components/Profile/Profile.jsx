import React, { useState, useEffect } from "react";
import User from "../../../../Backend/Models/user";
import EditIcon from "./EditIcon";
import './Profile.css';

const ProfilePage = () => {
  
  const [users,setUser]= useState([]);
  const [studentId,setStudentId]= useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [dob, setDob] = useState();

  useEffect(() => {
    const getUserId = async () =>{
        const savedValue = JSON.parse(localStorage?.getItem('user')); 
        if (savedValue) {
        setStudentId(savedValue);
        console.log("User ID: " + savedValue);
        }
    };
    const fetchUserData = async () => {
      try {
        if (studentId) {
          const response = await axios.get(`${serverURL}/users/${studentId}`);
          const user = response.data;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
      fetchUserData();
      getUserId();
  },[]);



  const changeName = () => {
    const name = prompt('Enter new name', username);
    if (name) {
      setUsername(name);
    }
  };

  const changeEmail = () => {
    const newEmail = prompt('Enter new email', email);
    if (newEmail) {
      setEmail(newEmail);
    }
  };

  const changeAddress = () => {
    const newAddress = prompt('Enter new address', address);
    if (newAddress) {
      setAddress(newAddress);
    }
  };

  const changePhone = () => {
    const newPhone = prompt('Enter new phone number', phone);
    if (newPhone) {
      setPhone(newPhone);
    }
  };

  const changeDob = () => {
    const newDob = prompt('Enter new date of birth', dob);
    if (newDob) {
      setDob(newDob);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mainn">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 style={{ fontWeight: 'bolder', fontSize: '24px', color: 'blue' }}>User Profile</h2>
        <div className="text-center mb-8">
          <img
            src="data:image/jpeg;base64,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"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{username}</h2>
          <p className="text-gray-500">{email}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Username</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{username}</span>
              <button className="ml-2" onClick={changeName}><EditIcon /></button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <div className="flex items-center">
              <span className="text-blue-500 underline">{email}</span>
              <button className="ml-2" onClick={changeEmail}><EditIcon /></button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Address</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{address}</span>
              <button className="ml-2" onClick={changeAddress}><EditIcon /></button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Contact No.</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{phone}</span>
              <button className="ml-2" onClick={changePhone}><EditIcon /></button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">DOB</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{dob}</span>
              <button className="ml-2" onClick={changeDob}><EditIcon /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
