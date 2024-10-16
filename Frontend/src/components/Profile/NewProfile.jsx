import React from 'react';
import './Profile.css'
export default function NewProfile() {
  return (
    <div className="grid grid-cols-3 gap-8 h-screen p-6 mainn">
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 h-[70vh] mt-10 ml-12">
        <img 
          src="data:image/png;base64,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" 
          alt="Profile" 
          className="w-32 h-32 rounded-full object-cover" 
        />
        <h2 className="mt-4 text-lg font-semibold">Username</h2>
        <h3 className="mt-2 text-gray-600">Email</h3>
      </div>
      <div className="col-span-2 bg-white shadow-md rounded-lg p-6 h-[70vh] overflow-auto mt-10 mr-12">
        <h4 className="font-bold text-lg mb-12 text-center" style={{fontSize:'40px'}}>Profile Details</h4>
        <div className="card mb-3">
          <div className="card-body">
            <div className="space-y-4 ml-[15%] mr-12 mt-[13%]">
              {[
                { label: 'Full Name', value: 'Kenneth Valdez' },
                { label: 'Email', value: 'fip@jukmuh.al' },
                { label: 'Phone', value: '(239) 816-9029' },
                { label: 'Mobile', value: '(320) 380-4539' },
                { label: 'Address', value: 'Bay Area, San Francisco, CA' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <h6 className="mb-0 font-semibold">{label}</h6>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
