import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Sidebar from './Sidebar';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Loader } from 'lucide-react';

const RoomRequests = () => {
  const host = 'http://localhost:8000';
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    setIsLoading(true);
    const response = await fetch(`${host}/roomrequests/fetch`);
    const data = await response.json();
    const pendingRequests = data.filter((item) => item.status === 'Pending');
    setRequests(pendingRequests);
    setIsLoading(false);
  };

  const handleClick = (id, studentId, roomMateId) => {
    const state = { id, studentId };
    if (roomMateId) {
      state.roomMateId = roomMateId; // Add roomMateId only if it exists
    }
    navigate('/adminpage/roomrequests/approval', { state });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="h-screen bg-gray-100">
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      <div className="ml-16 flex-1 overflow-auto">
        <div className="p-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Room Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader className="animate-spin" size={32} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell>S No.</TableCell>
                        <TableCell>Hostel</TableCell>
                        <TableCell>Room No.</TableCell>
                        <TableCell>Room Type</TableCell>
                        <TableCell>Availability</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.hostel}</TableCell>
                          <TableCell>{item.roomNumber}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.isAvailable.toString()}</TableCell>
                          <TableCell>{item.status}</TableCell>
                          <TableCell>
                            <Button 
                              onClick={() => handleClick(item._id, item.studentId, item.roomMateId)}
                              size="sm"
                            >
                              Proceed
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RoomRequests;
