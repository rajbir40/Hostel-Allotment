import React,{useState,useEffect} from 'react';
import axios from 'axios';
import NavbarTest from '../Navbar/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  BookOpen,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
const serverURL = "http://localhost:8000";

const ProfilePage = ({ 
}) => {
  const [users, setUser] = useState([]);
  const [studentId, setStudentId] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhone] = useState();
  const [dob, setDob] = useState();
  const [rollNum, setRollNum] = useState("");
  const [outpassRequests, setOutpassRequests] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedStudentId = JSON.parse(localStorage?.getItem('user'));
        setStudentId(storedStudentId);
        if (storedStudentId) {
          const response = await axios.get(`${serverURL}/user/student/${storedStudentId}`);
          const user = response.data;
          const formattedDob = new Date(user.dob).toLocaleDateString();
          setUsername(user.name);
          setEmail(user.email);
          setDob(formattedDob);
          setAddress(user.address);
          setPhone(user.phoneNumber);
          setRollNum(user.enrollmentId);
        } else {
          console.error("No student ID found in local storage.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Separate useEffect for fetching outpass requests based on rollNum
  useEffect(() => {
    const fetchOutpassRequests = async () => {
      const response = await fetch(`${serverURL}/outpasses/fetch/${rollNum}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOutpassRequests(data)
      console.log(data)
    };

    fetchOutpassRequests();
  }, [rollNum]);
  return (
    <>
    <NavbarTest></NavbarTest>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
          <p className="text-gray-500">Manage your information and view outpass history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-brown-100 border-4 border-white shadow-xl overflow-hidden">
                      <img
                        src="/api/placeholder/128/128"
                        alt={username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge className="absolute bottom-2 right-2 bg-green-500">Active</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{username}</h2>
                  <p className="text-gray-500 text-sm mb-4">{rollNum}</p>
                  <div className="w-full space-y-4">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{phoneNumber}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{dob}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{address}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Outpass Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-gray-900">{outpassRequests.length}</p>
                  <p className="text-sm text-gray-500">Total Requests</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {outpassRequests.filter(r => r.approved).length}
                  </p>
                  <p className="text-sm text-gray-500">Approved</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Outpass History */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-gray-900">Outpass History</CardTitle>
                  <Badge variant="secondary">
                    {outpassRequests.length} {outpassRequests.length === 1 ? 'outpass' : 'outpasses'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {outpassRequests.length > 0 ? (
                  <div className="space-y-6">
                    {outpassRequests.map((outpass, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          {outpass.approved ? (
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                              <AlertTriangle className="w-5 h-5 text-yellow-600" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{outpass.reason}</h3>
                              <p className="text-sm text-gray-500">{outpass.description}</p>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(outpass.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <Badge
                              className={outpass.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {outpass.approved ? 'Approved' : 'Pending'}
                            </Badge>
                            
                            {!outpass.approved && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => navigate("/adminpage/outpassrequest")}
                              >
                                View details
                                <ArrowUpRight className="w-4 h-4 ml-1" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Outpass History</h3>
                    <p className="text-gray-500">You haven't submitted any outpass requests yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Card */}
          {/* <Card className="mt-10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
              {recentActivities.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {recentActivities.length} {recentActivities.length === 1 ? 'item' : 'items'}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              {recentActivities.length > 0 ? (
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {activity.resolved ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm text-gray-900">
                            {activity.type}
                          </p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {new Date(activity.timestamp).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {activity.description}
                        </p>
                        {!activity.resolved && (
                          <div className="mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 -ml-2"
                              onClick={() => {
                                const path = activity.type === "Room Booking Request"
                                  ? "/adminpage/roomrequests"
                                  : "/adminpage/outpassrequest";
                                navigate(path);
                              }}
                            >
                              View details
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-gray-500">No recent activity to display</p>
                </div>
              )}
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
