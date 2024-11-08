import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

const OutpassRequest = () => {
  const host = 'http://localhost:8000';
  const [outpass, setOutpass] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOutpass = async () => {
    setIsLoading(true);
    const response = await fetch(`${host}/pending/fetchoutpass`);
    const data = await response.json();
    const pendingOutpasses = await data.filter((item) => item.status === 'Pending');
    setOutpass(pendingOutpasses);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOutpass();
  }, []);

  const handleApprove = async (rollNumber) => {
    setIsLoading(true);
    const response = await fetch(`${host}/update/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Approved',
        roll_number: rollNumber,
      }),
    });

    await response.json();
    fetchOutpass();
    setIsLoading(false);
  };

  return (
    <div className=" min-h-screen bg-gray-100" style={{background:'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)'}}>
        <Sidebar />

      <div className="ml-64 flex-1 overflow-auto">
        <div className="p-8">
        <div className="flex justify-center items-center text-center mb-8">
          <h1 className="text-3xl font-bold" style={{padding: '1%',position: 'fixed',top: '0',justifyContent: 'center',width: '100%',display: 'flex',backgroundColor: 'white',color: '#0000FF'}}>Outpass Requests</h1>
        </div>
          <Card className="w-full" style={{marginTop:'90px'}}>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader className="animate-spin" size={32} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow style={{fontWeight:'bolder', textAlign:'center'}}>
                        <TableCell>S.No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Roll No.</TableCell>
                        <TableCell>Proceeding to</TableCell>
                        <TableCell>Own Responsibility</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {outpass.map((item, index) => (
                        <TableRow key={index} style={{textAlign:'center'}}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.roll_no}</TableCell>
                          <TableCell>{item.where}</TableCell>
                          <TableCell>{item.responsibility}</TableCell>
                          <TableCell>{item.reason}</TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleApprove(item.roll_no)}
                              style={{backgroundColor:'green'}}
                            >
                              Approve
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

export default OutpassRequest;