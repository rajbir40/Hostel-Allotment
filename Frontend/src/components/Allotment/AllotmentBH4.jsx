import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Info, CheckCircle2 } from 'lucide-react';

const serverURL = `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`

const RoomButton = ({ room, onClick, hasPendingRequest }) => {
  const isAvailable = room?.isAvailable;
  
  // Determine button color based on status
  const getButtonStyle = () => {
    if (hasPendingRequest) {
      return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
    return isAvailable 
      ? 'bg-green-600 hover:bg-green-700 text-white' 
      : 'bg-red-600 text-white opacity-80';
  };
  
  return (
    <div className="relative group">
      <button
        onClick={() => onClick(room)}
        disabled={!isAvailable && !hasPendingRequest}
        className={`
          relative h-8 w-12 rounded-lg font-medium text-sm transition-all duration-200
          ${getButtonStyle()}
        `}
      >
        {room?.roomNumber}
        <Info className="absolute -top-1 -right-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
};

const RoomDetails = ({ room, onBook, onClose, setIsRoommateDialogOpen, hasPendingRequest }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm font-medium text-gray-500">Room Number</p>
        <p className="text-lg font-semibold">{room.roomNumber}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Status</p>
        <p className={`text-lg font-semibold ${
          hasPendingRequest ? 'text-blue-600' : 
          room.isAvailable ? 'text-green-600' : 'text-red-600'
        }`}>
          {hasPendingRequest ? 'Pending Request' : 
           room.isAvailable ? 'Available' : 'Occupied'}
        </p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Floor</p>
        <p className="text-lg font-semibold">{Math.floor(room.roomNumber / 100)}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Block</p>
        <p className="text-lg font-semibold">BH-4</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">Room Type</p>
        <p className="text-lg font-semibold">{room.type}</p>
      </div>
    </div>
    
    <DialogFooter className="flex gap-2 justify-end mt-4">
      {room.isAvailable && !hasPendingRequest && (
        <button
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
          onClick={() => onBook(room)}
        >
          Book Room
        </button>
      )}
      {room.type === 'Double' && room.isAvailable && !hasPendingRequest && (
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

const HostelLayout = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoommateDialogOpen, setIsRoommateDialogOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [pendingRequests, setPendingRequests] = useState(new Set());

  const showNotification = (title, message, type = 'info') => {
    setNotification({ title, message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        // Mock user data since localStorage is not available
        const mockUserId = 'user_123';
        setStudentId(mockUserId);

        // Mock room data for demonstration
        const mockRooms = Array.from({ length: 70 }, (_, i) => ({
          roomNumber: 101 + i,
          isAvailable: Math.random() > 0.3, // 70% chance of being available
          hostel: 'BH-4',
          type: Math.random() > 0.5 ? 'Single' : 'Double'
        }));
        
        setRooms(mockRooms);
      } catch (error) {
        showNotification(
          'Error',
          'Failed to initialize. Please try again.',
          'error'
        );
      }
    };

    initialize();
  }, []);

  const handleRoomBooking = async (roomData) => {
    if (!studentId) {
      showNotification(
        'Authentication Required',
        'User ID not found. Please log in again.',
        'error'
      );
      return;
    }

    try {
      // Simulate API call
      const bookingData = {
        ...roomData,
        studentId: studentId,
        hostel: 'BH-4',
      };

      // Simulate successful booking request
      console.log('Booking request:', bookingData);
      
      // Add room to pending requests
      setPendingRequests(prev => new Set([...prev, roomData.roomNumber]));
      
      showNotification(
        'Request Sent',
        `Room ${roomData.roomNumber}'s request has been sent!`,
        'success'
      );
      
      setIsDialogOpen(false);
    } catch (error) {
      showNotification(
        'Booking Failed',
        'Failed to book the room. Please try again.',
        'error'
      );
    }
  };

  const handleRoommateRequest = async (roommateData) => {
    if (!studentId) {
      showNotification(
        'Authentication Required',
        'User ID not found. Please log in again.',
        'error'
      );
      return;
    }

    try {
      const payload = {
        ...roommateData,
        studentId: studentId,
        hostel: 'BH-4',
        roomNumber: selectedRoom.roomNumber
      };

      console.log('Roommate request:', payload);

      // Add room to pending requests
      setPendingRequests(prev => new Set([...prev, selectedRoom.roomNumber]));
      
      setIsRoommateDialogOpen(false);
      setIsDialogOpen(false);
      
      showNotification(
        'Request Sent',
        'Roommate request has been sent successfully!',
        'success'
      );
    } catch (error) {
      showNotification(
        'Request Failed',
        'Failed to request a roommate. Please try again.',
        'error'
      );
    }
  };

  const NotificationAlert = ({ notification }) => {
    if (!notification) return null;

    const icons = {
      error: <AlertCircle className="h-5 w-5 text-red-500" />,
      success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      info: <Info className="h-5 w-5 text-blue-500" />
    };

    const colors = {
      error: 'border-red-500 bg-red-50',
      success: 'border-green-500 bg-green-50',
      info: 'border-blue-500 bg-blue-50'
    };

    return (
      <div className="fixed top-4 right-4 z-50 w-96 animate-in slide-in-from-top-2 duration-300">
        <Alert className={`${colors[notification.type]} shadow-lg`}>
          <div className="flex gap-3">
            {icons[notification.type]}
            <div>
              <AlertTitle className="font-semibold">{notification.title}</AlertTitle>
              <AlertDescription>{notification.message}</AlertDescription>
            </div>
          </div>
        </Alert>
      </div>
    );
  };

  const RoommateDialog = ({ room, onRequestRoommate, onClose }) => {
    const [roommateName, setRoommateName] = useState('');
    const [roomieRollNumber, setroomieRollNumber] = useState('');

    const handleSubmit = () => {
      if (!roommateName || !roomieRollNumber) {
        showNotification(
          'Validation Error',
          'Please fill in all fields',
          'error'
        );
        return;
      }
      onRequestRoommate({
        roommateName,
        roomieRollNumber
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
              <label htmlFor="roomieRollNumber" className="block text-sm font-medium text-gray-700">
                Roommate Enrollment ID
              </label>
              <input
                type="text"
                id="roomieRollNumber"
                value={roomieRollNumber}
                onChange={(e) => setroomieRollNumber(e.target.value)}
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
      {rooms.slice(start, end).map(room => {
        const hasPendingRequest = pendingRequests.has(room.roomNumber);
        return (
          <Dialog key={room.roomNumber} open={isDialogOpen && selectedRoom?.roomNumber === room.roomNumber} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div>
                <RoomButton 
                  room={room} 
                  onClick={() => {
                    setSelectedRoom(room);
                    setIsDialogOpen(true);
                  }}
                  hasPendingRequest={hasPendingRequest}
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
                hasPendingRequest={hasPendingRequest}
              />
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );

  return (
    <div className="relative h-screen w-screen bg-gray-50 p-8">
      <NotificationAlert notification={notification} />
      
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

      <div className="absolute top-4 left-4 flex items-center gap-4 ml-72">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
          <span className="text-sm">Pending Request</span>
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