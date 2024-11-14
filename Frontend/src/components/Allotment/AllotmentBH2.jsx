import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import axios from 'axios';

const serverURL = "http://localhost:8000";

const RoomButton = ({ room, onClick }) => {
  const isAvailable = room?.isAvailable;
  
  return (
    <div className="relative group">
      <button
        onClick={() => onClick(room)}
        disabled={!isAvailable}
        className={`
          relative h-8 w-12 rounded-lg font-medium text-sm transition-all duration-200
          ${isAvailable 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-red-600 text-white opacity-80'
          }
        `}
      >
        {room?.roomNumber}
        <Info className="absolute -top-1 -right-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

const RoomDetails = ({ room, onBook, onClose }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-500">Room Number</p>
        <p className="text-lg font-semibold">{room.roomNumber}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Status</p>
        <p className={`text-lg font-semibold ${room.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
          {room.isAvailable ? 'Available' : 'Occupied'}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Floor</p>
        <p className="text-lg font-semibold">{Math.floor(room.roomNumber / 100)}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Block</p>
        <p className="text-lg font-semibold">BH-2</p>
      </div>
      <div>
  <p className="text-sm font-medium text-gray-500">Booking Requests</p>
  <p className="text-lg font-semibold">{Math.floor(Math.random() * 3)}</p>
</div>
    </div>
    
    <DialogFooter className="flex gap-2 justify-end mt-4">
      {room.isAvailable && (
        <button
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          onClick={onBook}
        >
          Book Room
        </button>
      )}
      <button
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
        onClick={onClose}
      >
        Close
      </button>
    </DialogFooter>
  </div>
);

const HostelLayout = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoommateDialogOpen, setIsRoommateDialogOpen] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Get user data first
        const savedValue = localStorage.getItem('user');
        if (savedValue) {
          const parsedValue = JSON.parse(savedValue);
          // Extract _id from the user object if it exists
          const userId = parsedValue._id || parsedValue;
          setStudentId(userId);
        }

        // Then fetch rooms
        const response = await axios.get(`${serverURL}/room`);
        const filteredRooms = response.data.filter(room => room.hostel === 'BH-2');
        setRooms(filteredRooms);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    initialize();
  }, []); // Single useEffect for initialization

  const handleRoomBooking = async (roomData) => {
    if (!studentId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const bookingData = {
        ...roomData,
        studentId: studentId,
        hostel: 'BH-2',
      };

      const response = await axios.post(`${serverURL}/bookroom/req`, bookingData);
      
      if (response.status === 208) {
        alert("You have already booked a room!");
        return;
      }
      
      alert(`Room ${roomData.roomNumber}'s request has been sent!`);
      
      // Refresh rooms instead of reloading page
      const updatedRooms = await axios.get(`${serverURL}/room`);
      setRooms(updatedRooms.data.filter(room => room.hostel === 'BH-2'));
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error booking room:', error);
      alert('Failed to book the room. Please try again.');
    }
  };

  const handleRoommateRequest = async (roommateData) => {
    if (!studentId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const payload = {
        ...roommateData,
        studentId: studentId,
        hostel: 'BH-2',
        roomNumber: selectedRoom.roomNumber
      };
      console.log(payload);

      const response = await axios.post(`${serverURL}/bookroom/req`, payload);
      setIsRoommateDialogOpen(false);
      
      const updatedRooms = await axios.get(`${serverURL}/room`);
      setRooms(updatedRooms.data.filter(room => room.hostel === 'BH-2'));
      alert("request sent!");
    } catch (error) {
      console.error('Error requesting roommate:', error);
      alert('Failed to request a roommate. Please try again.');
    }
  };

  const RoomButton = ({ room, onClick }) => {
    const isAvailable = room?.isAvailable;
    
    return (
      <div className="relative group">
        <button
          onClick={() => onClick(room)}
          disabled={!isAvailable}
          className={`
            relative h-8 w-12 rounded-lg font-medium text-sm transition-all duration-200
            ${isAvailable 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-red-600 text-white opacity-80'
            }
          `}
        >
          {room?.roomNumber}
          <Info className="absolute -top-1 -right-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    );
  };

  const RoomDetails = ({ room, onBook, onClose, setIsRoommateDialogOpen }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Room Number</p>
          <p className="text-lg font-semibold">{room.roomNumber}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <p className={`text-lg font-semibold ${room.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
            {room.isAvailable ? 'Available' : 'Occupied'}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Floor</p>
          <p className="text-lg font-semibold">{Math.floor(room.roomNumber / 100)}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Block</p>
          <p className="text-lg font-semibold">BH-2</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Room Type</p>
          <p className="text-lg font-semibold">{room.type}</p>
        </div>
      </div>
      
      <DialogFooter className="flex gap-2 justify-end mt-4">
        {room.isAvailable && (
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            onClick={() => onBook(room)}
          >
            Book Room
          </button>
        )}
        {room.type === 'Double' && room.isAvailable && (
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setIsRoommateDialogOpen(true)}
          >
            Request Roommate
          </button>
        )}
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </DialogFooter>
    </div>
  );

  const RoommateDialog = ({ room, onRequestRoommate, onClose }) => {
    const [roommateName, setRoommateName] = useState('');
    const [roommateId, setRoommateId] = useState('');

    const handleSubmit = () => {
      if (!roommateName || !roommateId) {
        alert("Please fill in all fields");
        return;
      }
      onRequestRoommate({
        roommateName,
        roommateId
      });
    };

    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Roommate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="roommateName" className="block text-sm font-medium text-gray-700">
                Roommate Name
              </label>
              <input
                type="text"
                id="roommateName"
                value={roommateName}
                onChange={(e) => setRoommateName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="roommateId" className="block text-sm font-medium text-gray-700">
                Roommate Enrollment ID
              </label>
              <input
                type="text"
                id="roommateId"
                value={roommateId}
                onChange={(e) => setRoommateId(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Roommate
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const RoomGroup = ({ start, end }) => (
    <div className="flex gap-4">
      {rooms.slice(start, end).map(room => (
        <Dialog key={room.roomNumber} open={isDialogOpen && selectedRoom?.roomNumber === room.roomNumber} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <div>
              <RoomButton 
                room={room} 
                onClick={() => {
                  setSelectedRoom(room);
                  setIsDialogOpen(true);
                }} 
              />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Room Details</DialogTitle>
            </DialogHeader>
            <RoomDetails 
              room={room} 
              onBook={handleRoomBooking}
              onClose={() => setIsDialogOpen(false)}
              setIsRoommateDialogOpen={setIsRoommateDialogOpen}
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );

  return (
    <div className="relative h-screen w-screen bg-gray-50 p-8">
      <Card className="absolute top-20 left-20 right-20">
        <CardContent className="p-6">
          <div className="flex gap-8 justify-center">
            <div className="flex flex-col gap-4">{[0, 1].map(i => <RoomGroup key={i} start={i*2} end={(i+1)*2} />)}</div>
            {[2, 6, 10, 14, 18].map(startIdx => (
              <div key={startIdx} className="flex flex-col gap-4">
                <RoomGroup start={startIdx} end={startIdx + 2} />
                <RoomGroup start={startIdx + 2} end={startIdx + 4} />
              </div>
            ))}
            <div className="flex flex-col gap-4">
              <RoomGroup start={22} end={24} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="absolute bottom-20 left-20 right-20">
        <CardContent className="p-6">
          <div className="flex gap-8 justify-center">
            <div className="flex flex-col gap-4">
              <RoomGroup start={36} end={38} />
            </div>
            {[38, 42, 46, 50, 54].map(startIdx => (
              <div key={startIdx} className="flex flex-col gap-4">
                <RoomGroup start={startIdx} end={startIdx + 2} />
                <RoomGroup start={startIdx + 2} end={startIdx + 4} />
              </div>
            ))}
            <div className="flex flex-col gap-4">
              <RoomGroup start={58} end={60} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="absolute top-20 bottom-20 left-20 w-48">
        <CardContent className="h-full p-6">
          <div className="flex flex-col gap-4 justify-center h-full">
            {[58, 60, 62, 64, 66, 68].map(startIdx => (
              <RoomGroup key={startIdx} start={startIdx} end={startIdx + 2} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="absolute top-20 bottom-20 right-20 w-48">
        <CardContent className="h-full p-6">
          <div className="flex flex-col gap-4 justify-center h-full">
            {[24, 26, 28, 30, 32, 34].map(startIdx => (
              <RoomGroup key={startIdx} start={startIdx} end={startIdx + 2} />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="absolute top-4 left-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
          <span className="text-sm">Occupied</span>
        </div>
      </div>

      {isRoommateDialogOpen && (
        <RoommateDialog
          room={selectedRoom}
          onRequestRoommate={handleRoommateRequest}
          onClose={() => setIsRoommateDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default HostelLayout;