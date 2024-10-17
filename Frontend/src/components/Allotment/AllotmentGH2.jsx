import React,{useEffect,useState} from 'react'
import axios from 'axios';
import './Allotment.css';
import Navbar from '../Navbar/Navbar';
const serverURL="http://localhost:8000";

export default function AllotmentGH2() {
  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); 
  const [studentId,setStudentId] = useState(null);
  
  useEffect(() => {
      const getUserId = async () =>{
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
    },[]);
  
    const handleRoomClick = async (roomData) => {
        setSelectedRoom(roomData);
    
        const confirmation = window.confirm(`Are you sure you want to book room ${roomData.roomNumber}?`);
        if (confirmation) {
          const reqData = { ...roomData, studentId };
          try {
            const response = await axios.post(`${serverURL}/bookroom/room`, reqData);
            console.log("Room booked successfully:", response.data);
            alert(`Room ${roomData.roomNumber} booked successfully!`);
          } catch (error) {
            console.error("Error booking room:", error);
            alert("Failed to book the room. Please try again.");
          }
        } else {
          alert(`Booking for room ${roomData.roomNumber} canceled.`);
        }
      };
  
    return (
      <div>
        <Navbar></Navbar>
      <div className='main-allotment'>
        <div className='hostel'>
    {/* Floor Buttons */}
    <div className="flex flex-row mt-5 ">
      <button type="button" className="grid-item text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Ground Floor
      </button>
      <button type="button" className="grid-item text-white bg-white-700 hover:bg-white-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        1st Floor
      </button>
    </div>
    {/* Room Layout */}
  <div className="ml-[25%] mr-[25%] mt-[7%] hostel-box">
    <div className="flex justify-center items-center">
      <div
        className="w-full p-12"
        style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.6)', display: '-ms-flexbox', justifyContent: 'center' }}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-evenly">
            {/* First Row */}
            <div className="flex justify-center gap-3">
              {room.slice(0, 2).map((r, index) => (
                <button
                    key={index}
                    type="button"
                    className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] `} 
                    style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                    disabled={!r.isAvailable}
                    onClick={() => r.isAvailable && handleRoomClick(r)}
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
                  className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] `} 
                  style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                  disabled={!r.isAvailable}
                  onClick={() => r.isAvailable && handleRoomClick(r)}
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
                  className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] `} 
                  style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                  disabled={!r.isAvailable}
                  onClick={() => r.isAvailable && handleRoomClick(r)}
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
                  className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] `} 
                  style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                  disabled={!r.isAvailable}
                  onClick={() => r.isAvailable && handleRoomClick(r)}
                  >
                  {r.roomNumber}
                </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <div className="flex justify-center gap-3">
                {room.slice(10, 12).map((r, index) => (
                  <button
                  key={index}
                  type="button"
                  className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] `} 
                  style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                  disabled={!r.isAvailable}
                  onClick={() => r.isAvailable && handleRoomClick(r)}
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
                  className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] `} 
                  style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                  disabled={!r.isAvailable}
                  onClick={() => r.isAvailable && handleRoomClick(r)}
                  >
                  {r.roomNumber}
                </button>
                ))}
              </div>

              {/* Fourth Row */}
              <div className="flex justify-center mt-5 gap-3 p-2">
                {room.slice(14, 18).map((r, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] `} 
                    style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                    disabled={!r.isAvailable}
                    onClick={() => r.isAvailable && handleRoomClick(r)}
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
    </div>
    

  );
};
