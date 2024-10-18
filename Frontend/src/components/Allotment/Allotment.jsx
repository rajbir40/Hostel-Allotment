import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

import axios from 'axios';
import './Allotment.css';
import Navbar from '../Navbar/Navbar';

const serverURL = "http://localhost:8000";

Modal.setAppElement('#root'); // Required for accessibility

export default function Allotment() {
  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const savedValue = JSON.parse(localStorage?.getItem('user'));
      if (savedValue) {
        setStudentId(savedValue);
        console.log("User ID: " + savedValue);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${serverURL}/room`);
        console.log(response.data);
        const filteredRooms = response.data.filter(room => room.hostel === 'GH-1');
        setRoom(filteredRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
    getUserId();
  }, []);

  const openModal = (roomData) => {
    setSelectedRoom(roomData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRoomBooking = async () => {
    const reqData = { ...selectedRoom, studentId };
    try {
      const response = await axios.post(`${serverURL}/bookroom/room`, reqData);
      console.log('Room booked successfully:', response.data);
      setModalIsOpen(false);
      if(response.status==208){
        alert("You have already booked a room!");
        return;
      }
      alert(`Room ${selectedRoom.roomNumber} has been booked successfully!`);
      window.location.reload(true); 
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book the room. Please try again.');
    }
  };


  return (
    <div>
  <Navbar></Navbar>
  <div className={`main-allotment ${modalIsOpen ? 'blur-background' : ''}`}>
    <div className='hostel'>
      {/* Floor Buttons */}
      <div className="flex flex-row mt-5">
        <button type="button" className="grid-item text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Ground Floor
        </button>
        <button type="button" className="grid-item text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          1st Floor
        </button>
      </div>

      {/* Room Layout */}
      <div className="ml-[25%] mr-[25%] mt-[7%] hostel-box">
        <div className="flex justify-center items-center rounded-sm">
          <div className="w-full p-12 rounded-sm" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)', display: '-ms-flexbox', justifyContent: 'center'}}>
            <div className="flex flex-col justify-center rounded-sm">
              <div className="flex justify-evenly">
                {/* First Row */}
                <div className="flex justify-center gap-3">
                  {room.slice(0, 2).map((r, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px]`}
                      style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                      disabled={!r.isAvailable}
                      onClick={() => r.isAvailable && openModal(r)}
                    >
                      {r.roomNumber}
                    </button>
                  ))}
                </div>
              </div>


              {/* Second Row */}
              <div className="flex justify-evenly mt-5">
                <div className="flex flex-col w-full gap-y-2">
                  <div className="flex justify-center gap-3">
                    {room.slice(2, 4).map((r, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px]`}
                        style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                        disabled={!r.isAvailable}
                        onClick={() => r.isAvailable && openModal(r)}
                      >
                        {r.roomNumber}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3">
                    {room.slice(4, 6).map((r, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px]`}
                        style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                        disabled={!r.isAvailable}
                        onClick={() => r.isAvailable && openModal(r)}
                      >
                        {r.roomNumber}
                      </button>
                    ))}
                  </div>

                  {/* Third Row */}
                  <div className="flex justify-center mt-5 gap-3 p-2">
                    {room.slice(6, 10).map((r, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px]`}
                        style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                        disabled={!r.isAvailable}
                        onClick={() => r.isAvailable && openModal(r)}
                      >
                        {r.roomNumber}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fourth Row */}
                <div className="flex flex-col w-full gap-y-2">
                  <div className="flex justify-center gap-3">
                    {room.slice(10, 12).map((r, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px]`}
                        style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                        disabled={!r.isAvailable}
                        onClick={() => r.isAvailable && openModal(r)}
                      >
                        {r.roomNumber}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center gap-3">
                    {room.slice(12, 14).map((r, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px]`}
                        style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                        disabled={!r.isAvailable}
                        onClick={() => r.isAvailable && openModal(r)}
                      >
                        {r.roomNumber}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-center mt-5 gap-3 p-2">
                    {room.slice(14, 18).map((r, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px]`}
                        style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                        disabled={!r.isAvailable}
                        onClick={() => r.isAvailable && openModal(r)}
                      >
                        {r.roomNumber}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


      {/* Modal for Room Booking Confirmation */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Room Booking Confirmation"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Confirm Booking</h2>
        {selectedRoom && (
          <p>Are you sure you want to book room {selectedRoom.roomNumber}?</p>
        )}
        <button onClick={handleRoomBooking} className="confirm-button">Yes, Book It!</button>
        <button onClick={closeModal} className="cancel-button">Cancel</button>
      </Modal>

      {/* CSS for the modal and blur effect */}
      <style jsx>{`
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          margin-right: -50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .modal-overlay {
          background-color: rgba(0, 0, 0, 0.75);
        }
        .modal-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        .confirm-button, .cancel-button {
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .confirm-button {
          background-color: #3085d6;
          color: white;
        }
        .cancel-button {
          background-color: #d33;
          color: white;
        }
        .blur-background {
          filter: blur(4px);
        }
      `}</style>
    </div>
  );
}