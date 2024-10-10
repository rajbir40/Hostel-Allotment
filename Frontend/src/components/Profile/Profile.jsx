import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        

        {/* Profile Picture and Info */}
        <div className="text-center mb-8">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">Jessica Alba</h2>
          <p className="text-gray-500">@jennywilson</p>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Username</span>
            <span className="text-gray-900 font-medium">Jenny Wilson</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email</span>
            <span className="text-blue-500 underline">jenny@gmail.com</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Address</span>
            <span className="text-gray-900 font-medium">New York, USA</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Contact No.</span>
            <span className="text-gray-900 font-medium">Sky Angel</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">DOB</span>
            <span className="text-gray-900 font-medium">April 20, 1981</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
