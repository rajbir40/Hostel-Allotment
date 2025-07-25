import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import axios from "axios";

const RoomApprovalPage = () => {
  const location = useLocation();
  const { id, studentId, roomMateId } = location.state || {};
  const host = `${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}`;
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [roomie, setRoomieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // console.log(studentId);
  useEffect(() => {
    const fetchDetails = async () => {
      if (!id || !studentId) return;
      setIsLoading(true);

    //  console.log("Student ID:", studentId);
    //   console.log("Roommate ID:", roomMateId);


      try {
        const roomRes = await axios.get(`${host}/roomrequests/requestdetails/${id}`);
        setDetails(roomRes.data);
        // console.log("hello")

        const studentRes = await axios.get(`${host}/getuser/student/${studentId}`);
        setStudentData(studentRes.data);
        // console.log(studentRes.data);

        if (roomMateId) {
          const roomieRes = await axios.get(`${host}/getuser/student/${roomMateId}`);
          setRoomieData(roomieRes.data);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id, studentId, roomMateId]);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${host}/roomrequests/update/${id}`, {
        update: "Approved",
      });

      navigate("/adminpage/roomrequests");
    } catch (error) {
      console.error("Error approving request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${host}/roomrequests/update/${id}`, {
        update: "Rejected",
      });

      navigate("/adminpage/roomrequests");
    } catch (error) {
      console.error("Error rejecting request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ml-20 flex h-screen">
      <Sidebar className="flex-shrink-0 w-64 bg-gray-100 p-8" />
      <div className="flex-1 bg-gray-50 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Room Approval</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin" size={32} />
          </div>
        ) : (
          <>
            {/* Room Details */}
            <Card className="mb-6">
              <CardHeader className="bg-gray-100 border-b">
                <CardTitle>Room Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-600">Hostel</div>
                    <div className="text-gray-900">{details?.hostel}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Room Number</div>
                    <div className="text-gray-900">{details?.roomNumber}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Room Type</div>
                    <div className="text-gray-900">{details?.type}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Available</div>
                    <div className="text-gray-900">{details?.isAvailable ? "Yes" : "No"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Details */}
            <Card className="mb-6">
              <CardHeader className="bg-gray-100 border-b">
                <CardTitle>Student Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-600">Name</div>
                    <div className="text-gray-900">{studentData?.name}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Roll Number</div>
                    <div className="text-gray-900">{studentData?.enrollmentId}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Email</div>
                    <div className="text-gray-900">{studentData?.email}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Address</div>
                    <div className="text-gray-900">{studentData?.address}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-600">Phone</div>
                    <div className="text-gray-900">{studentData?.phoneNumber}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Roommate Details */}
            {roomMateId && (
              <Card className="mb-6">
                <CardHeader className="bg-gray-100 border-b">
                  <CardTitle>Roommate Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {roomie ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-medium text-gray-600">Name</div>
                        <div className="text-gray-900">{roomie?.name}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-600">Roll Number</div>
                        <div className="text-gray-900">{roomie?.enrollmentId}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-600">Email</div>
                        <div className="text-gray-900">{roomie?.email}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-600">Address</div>
                        <div className="text-gray-900">{roomie?.address}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-600">Phone</div>
                        <div className="text-gray-900">{roomie?.phoneNumber}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500">Roommate details are not available.</div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Approve / Reject Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Approve
              </Button>
              <Button
                onClick={handleReject}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white"
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
