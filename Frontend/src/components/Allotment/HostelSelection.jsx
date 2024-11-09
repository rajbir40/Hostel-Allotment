import React, { useState, useEffect } from 'react';
import { ChevronDown, Building2, Users, Calendar, MapPin, Info } from 'lucide-react';
import NavbarTest from '../Navbar/Navbar';
const HostelSelection = () => {
  const host = 'http://localhost:8000';
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [Hostels, setHostels] = useState([]);
  const fetchHostels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/gethostel/hostel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const hostelData = await response.json();
      console.log(hostelData);
      setHostels(hostelData);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

 
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      
      <NavbarTest></NavbarTest>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Hostel Selection
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your new home on campus. Our hostels offer comfortable living spaces with modern amenities and a vibrant community atmosphere.
          </p>
        </div>

        {/* Selection Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Hostel Selector */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Building2 className="text-blue-600" />
              Select Your Hostel
            </h3>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="w-full text-left bg-blue-50 hover:bg-blue-100 text-blue-800 font-semibold py-3 px-4 rounded-lg flex items-center justify-between transition-colors duration-200"
              >
                <span>{selectedHostel ? selectedHostel.name : 'Choose a hostel'}</span>
                <ChevronDown className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 max-h-64 overflow-y-auto">
                  {Hostels.length > 0 ? Hostels.map((hostel) => (
                    <button
                      key={hostel._id}
                      onClick={() => {
                        setSelectedHostel(hostel);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Building2 className="text-blue-600 w-4 h-4" />
                      {hostel.name}
                    </button>
                  )) : (
                    <p className="p-4 text-center text-gray-500">No hostels available</p>
                  )}
                </div>
              )}
            </div>

            {/* Selected Hostel Details */}
            {selectedHostel && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-lg mb-3">{selectedHostel.name} Details</h4>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Users className="text-blue-600 w-4 h-4" />
                    Capacity: {selectedHostel.totalRooms} rooms
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="text-blue-600 w-4 h-4" />
                    Availability: {selectedHostel.availableRooms || 'Not specified'}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="text-blue-600 w-4 h-4" />
                    Single Rooms: {selectedHostel.singleRooms || 'Not specified'}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="text-blue-600 w-4 h-4" />
                    Double Rooms: {selectedHostel.doubleRooms || 'Not specified'}
                  </p>
                  <div className="flex items-start gap-2">
                    <Info className="text-blue-600 w-4 h-4 mt-1" />
                    <div>
                      <p className="font-medium">Amenities:</p>
                      <ul className="list-disc list-inside pl-4">
                        {selectedHostel.amenities?.map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        )) || <li>No amenities listed</li>}
                      </ul>
                    </div>
                  </div>
                </div>
                <a
                  href={`/allotment${selectedHostel.name}`}
                  className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Proceed with Selection
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Information Cards */}
          <div className="space-y-6">
            {/* Important Dates */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-blue-600" />
                Important Dates
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Application Opens</span>
                  <span className="text-blue-600">July 1, 2024</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Application Deadline</span>
                  <span className="text-red-600">July 15, 2024</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Move-in Day</span>
                  <span className="text-green-600">August 1, 2024</span>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Selection Guidelines</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Selection is based on first-come, first-served basis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Students must complete all payments before move-in
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Room changes are only allowed in the first week
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  Keep your student ID handy during the process
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Help Center */}
        <div className="bg-blue-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">Our housing support team is here to assist you with any questions.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
              Contact Support
            </button>
            <button className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-2 rounded-lg transition-colors duration-200">
              FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelSelection;