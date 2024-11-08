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

  const handleClick = (id, studentId) => {
    navigate('/adminpage/roomrequests/approval', { state: { id, studentId } });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="h-screen bg-gray-100" style={{background:'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)'}}>
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      <div className="ml-64 flex-1 overflow-auto" style={{textAlign:'center'}}>
        <div className="p-8">
        <div className="flex justify-center items-center text-center mb-8">
          <h1 className="text-3xl font-bold" style={{padding: '1%',position: 'fixed',top: '0',justifyContent: 'center',width: '100%',display: 'flex',backgroundColor: 'white',color: '#0000FF'}}>Room Requests</h1>
        </div>
          <Card className="w-full" style={{marginTop:'70px'}}>
           
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader className="animate-spin" size={32} />
                </div>
              ) : (
                <div className="overflow-x-auto" style={{marginTop:'70px'}}>
                  <Table>
                    <TableHeader>
                      <TableRow style={{fontWeight:'bolder'}}>
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
                              onClick={() => handleClick(item._id, item.studentId)}
                              size="sm" style={{backgroundColor:'green'}}>
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