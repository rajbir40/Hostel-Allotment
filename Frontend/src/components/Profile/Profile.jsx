import React, { useState, useEffect } from "react";
import User from "../../../../Backend/Models/user";
import EditIcon from "./EditIcon";
const serverURL="http://localhost:8000";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 style={{ fontWeight: 'bolder', fontSize: '24px', color: 'blue' }}>User Profile</h2>
        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/100"
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
