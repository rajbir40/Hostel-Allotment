import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const RoomApprovalPage = () => {
  const location = useLocation();
  const { id, studentId } = location.state || {};
  const host = "http://localhost:8000";
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDetails = async () => {
    if (!id || !studentId) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${host}/roomrequests/requestdetails/${id}`);
      if (!response.ok) throw new Error("Failed to fetch details");

      const data = await response.json();
      setDetails(data);

      const studentResponse = await fetch(`${host}/getuser/student/${studentId}`);
      if (!studentResponse.ok) throw new Error("Failed to fetch student details");

      const studentData = await studentResponse.json();
      setStudentData(studentData);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id, studentId]);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/roomrequests/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ update: "Approved" }),
      });
      const data = await response.json();
      alert(data.message);
      navigate('/adminpage/roomrequests');
    } catch (error) {
      console.error("Error approving request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/roomrequests/update/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ update: "Rejected" }),
      });
      const data = await response.json();
      alert(data.message);
      navigate('/adminpage/roomrequests');
    } catch (error) {
      console.error("Error rejecting request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Sidebar />
      
      <div className="lg:ml-64 p-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin" size={32} />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Room Approval</h1>
            
            <Card className="mb-6">
              <CardHeader className="bg-gray-100 border-b">
                <CardTitle>Room Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Hostel</div>
                    <div className="text-gray-900">{details?.hostel}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Room Number</div>
                    <div className="text-gray-900">{details?.roomNumber}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Room Type</div>
                    <div className="text-gray-900">{details?.type}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Availability</div>
                    <div className="text-gray-900">{details?.isAvailable?.toString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader className="bg-gray-100 border-b">
                <CardTitle>Student Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Name</div>
                    <div className="text-gray-900">{studentData?.name}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Roll Number</div>
                    <div className="text-gray-900">{studentData?.rollNumber}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Email</div>
                    <div className="text-gray-900">{studentData?.email}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Address</div>
                    <div className="text-gray-900">{studentData?.address}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-600">Contact Details</div>
                    <div className="text-gray-900">{studentData?.phoneNumber}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Approve
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomApprovalPage;