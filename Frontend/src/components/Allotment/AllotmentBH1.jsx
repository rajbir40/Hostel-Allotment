import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './Allotment.css';
import Navbar from '../Navbar/Navbar';
Modal.setAppElement('#root');
const serverURL = "http://localhost:8000";
export default function AllotmentBH1() {
    const [rooms, setRooms] = useState([]);
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
                const filteredRooms = response.data.filter(room => room.hostel === 'BH-1');
                setRooms(filteredRooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
        getUserId();
    }, []);

    const openModal = (roomData) => {
        console.log("Room data:", roomData);
        setSelectedRoom(roomData);
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

    const handleRoomBooking = async () => {
        const reqData = { ...selectedRoom, studentId };
        try {
            const response = await axios.post(`${serverURL}/bookroom/req`, reqData);
            console.log('Request to book the room has been sent!', response.data);
            setModalIsOpen(false);
            if (response.status === 208) {
                alert("You have already booked a room!");
                return;
            }
            alert(`Room ${selectedRoom.roomNumber}'s request has been sent!`);
            window.location.reload(true);
        } catch (error) {
            console.error('Error booking room:', error);
            alert('Failed to book the room. Please try again.');
        }
    };

    const renderRooms = () => {
        return rooms.map((room, index) => (
            <button
                key={room.roomNumber}
                type="button"
                className={`text-white ${room.isAvailable ? 'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800' : 'bg-red-700 hover:bg-red-800'}font-medium rounded-lg text-xs px-3 py-1.5 h-[30px] w-[50px] dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800`}
                style={{ cursor: room.isAvailable ? 'pointer' : 'not-allowed ' }}
                disabled={!room.isAvailable}
                onClick={() => room.isAvailable && openModal(room)}
            >
                {room.roomNumber}
            </button>
        ));
    };

    return (
        <div className="relative h-screen w-screen">
            {/* Top */}
            <div className="absolute top-20 left-20 right-20 flex justify-center">
                <div className="flex gap-3 justify-center items-center w-full bg-gray-300 h-[100px]">
                    <div className="flex flex-col gap-6">{renderRooms().slice(0, 2)}</div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(2, 4)}</div>
                        <div className="flex gap-6">{renderRooms().slice(4, 6)}</div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(6, 8)}</div>
                        <div className="flex gap-6">{renderRooms().slice(8, 10)}</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(10, 12)}</div>
                        <div className="flex gap-6">{renderRooms().slice(12, 14)}</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(14, 16)}</div>
                        <div className="flex gap-6">{renderRooms().slice(16, 18)}</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(18, 20)}</div>
                        <div className="flex gap-6">{renderRooms().slice(20, 22)}</div>
                    </div>
                    <div className="flex flex-col gap-6">{renderRooms().slice(22, 24)}</div>
                    {/* Additional layout divs like above to match the required structure */}
                </div>
            </div>

            {/* Bottom */}
            <div className="absolute bottom-20 left-20 right-20 flex justify-center">
                <div className="w-full bg-gray-300 h-[100px]">
                    <div className="flex gap-3 justify-center items-center w-full bg-gray-300 h-[100px]">
                    <div className="flex flex-col gap-6">{renderRooms().slice(36, 38)}</div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(38, 40)}</div>
                        <div className="flex gap-6">{renderRooms().slice(40, 42)}</div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(42, 44)}</div>
                        <div className="flex gap-6">{renderRooms().slice(44, 46)}</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(46, 48)}</div>
                        <div className="flex gap-6">{renderRooms().slice(48, 50)}</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(50, 52)}</div>
                        <div className="flex gap-6">{renderRooms().slice(52, 54)}</div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(54, 56)}</div>
                        <div className="flex gap-6">{renderRooms().slice(56, 58)}</div>
                    </div>
                    <div className="flex flex-col gap-6">{renderRooms().slice(22, 24)}</div>
                        {/* Additional layout divs like above to match the required structure */}
                    </div>
                </div>
            </div>

            {/* Left */}
            <div className="absolute top-20 bottom-20 left-20 flex items-center">
                <div className="flex flex-col gap-10 justify-center items-center w-full bg-gray-300 ">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(58, 60)}</div>
                        <div className="flex gap-6">{renderRooms().slice(60, 62)}</div>
                        <div className="flex gap-6">{renderRooms().slice(62, 64)}</div>
                        <div className="flex gap-6">{renderRooms().slice(64, 66)}</div>
                        <div className="flex gap-6">{renderRooms().slice(66, 68)}</div>
                        <div className="flex gap-6">{renderRooms().slice(68, 70)}</div>
                    </div>
                    {/* Additional layout divs like above to match the required structure */}
                </div>
            </div>

            {/* Right */}
            <div className="absolute top-20 bottom-20 right-20 flex items-center">
                <div className="flex flex-col gap-10 justify-center items-center w-full bg-gray-300 ">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6">{renderRooms().slice(24, 26)}</div>
                        <div className="flex gap-6">{renderRooms().slice(26, 28)}</div>
                        <div className="flex gap-6">{renderRooms().slice(28, 30)}</div>
                        <div className="flex gap-6">{renderRooms().slice(30, 32)}</div>
                        <div className="flex gap-6">{renderRooms().slice(32, 34)}</div>
                        <div className="flex gap-6">{renderRooms().slice(34, 36)}</div>
                    </div>
                    {/* Additional layout divs like above to match the required structure */}
                </div>
            </div>
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
