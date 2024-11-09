import React, { useState, useEffect } from "react";
import EditIcon from "./EditIcon";
import './Profile.css';

const serverURL = 'http://localhost:8000';

const ProfilePage = () => {
  // State variables to store user details
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [profilePic, setProfilePic] = useState('');

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${serverURL}/user/profile`); // Assuming the endpoint for fetching user details is /user/profile
        const userData = response.data;

        setUsername(userData.username);
        setEmail(userData.email);
        setAddress(userData.address);
        setDob(userData.dob);
        setProfilePic(userData.profilePic); // Base64 image string or URL
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
      fetchUserData();
  },[]);



  // const changeName = () => {
  //   const name = prompt('Enter new name', username);
  //   if (name) {
  //     setUsername(name);
  //   }
  // };

  // const changeEmail = () => {
  //   const newEmail = prompt('Enter new email', email);
  //   if (newEmail) {
  //     setEmail(newEmail);
  //   }
  // };

  // const changeAddress = () => {
  //   const newAddress = prompt('Enter new address', address);
  //   if (newAddress) {
  //     setAddress(newAddress);
  //   }
  // };

  // const changePhone = () => {
  //   const newPhone = prompt('Enter new phone number', phone);
  //   if (newPhone) {
  //     setPhone(newPhone);
  //   }
  // };

  // const changeDob = () => {
  //   const newDob = prompt('Enter new date of birth', dob);
  //   if (newDob) {
  //     setDob(newDob);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center mainn">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 style={{ fontWeight: 'bolder', fontSize: '24px', color: 'blue' }}>User Profile</h2>
        <div className="text-center mb-8">
          <img
            src={profilePic ? profilePic : 'https://via.placeholder.com/150'} // Use placeholder if no profilePic is available
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
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <div className="flex items-center">
              <span className="text-blue-500 underline">{email}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Address</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{address}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">DOB</span>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium">{new Date(dob).toDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ProfilePage;