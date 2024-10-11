import React,{useEffect,useState} from 'react';
import axios from 'axios';
const serverURL="http://localhost:8000";

export default function Allotment() {
  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); 

  useEffect(() => {
      const fetchRooms = async () => {
        try {
          const response = await axios.get(`${serverURL}/room`);
          console.log(response.data);
          setRoom(response.data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };
      fetchRooms();
  },[]);

  const handleRoomClick = async (roomData) => {
    setSelectedRoom(roomData); 
    try {
        const response = await axios.post(`${serverURL}/bookroom/room`, roomData);
        console.log("Room data sent successfully:", response.data);
    } catch (error) {
        console.error("Error sending room data:", error);
    }
};

  return (
    <div>
      <div>
  {/* Floor Buttons */}
  <div className="flex flex-row mt-5">
    <button type="button" className="grid-item text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      Ground Floor
    </button>
    <button type="button" className="grid-item text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
      1st Floor
    </button>
  </div>

  {/* Room Layout */}
  <div className="ml-[25%] mr-[25%] mt-[7%]">
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
                  className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} 
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
                    className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} 
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
                    className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} 
                    style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                    disabled={!r.isAvailable}
                    onClick={() => r.isAvailable && handleRoomClick(r)}
                    >
                    {r.roomNumber}
                  </button>
                ))}
              </div>

              {/* Third Row */}
              <div className="flex justify-center mt-5 gap-3">
                {room.slice(6, 10).map((r, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} 
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
                    className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} 
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
                    className={`text-white ${r.isAvailable ? 'bg-blue-700 hover:bg-blue-800' : 'bg-red-700 hover:bg-red-800'} focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-[40px] w-[61.48px] dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} 
                    style={{ cursor: r.isAvailable ? 'pointer' : 'not-allowed' }}
                    disabled={!r.isAvailable}
                    onClick={() => r.isAvailable && handleRoomClick(r)}
                    >
                    {r.roomNumber}
                  </button>
                ))}
              </div>

              {/* Fourth Row */}
              <div className="flex justify-center mt-5 gap-3">
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
  );
};
