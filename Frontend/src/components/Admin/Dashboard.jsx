import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserRound, FileOutput, HomeIcon, Search } from "lucide-react";
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const host = 'http://localhost:8000';
  const [userCount, setUserCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [outpassCount, setOutpassCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]); // State to hold recent activity data

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const userResponse = await fetch(`${host}/getnumber/students`);
      const userData = await userResponse.json();
      setUserCount(userData.number);

      const roomResponse = await fetch(`${host}/roomrequests/fetch`);
      const roomData = await roomResponse.json();
      setRoomCount(roomData.length);

      const outpassResponse = await fetch(`${host}/pending/fetchoutpass`);
      const outpassData = await outpassResponse.json();
      setOutpassCount(outpassData.length);

      const activitiesResponse = await fetch(`${host}/activity/recent-activities`);
      const activitiesData = await activitiesResponse.json();
      setRecentActivities(activitiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="lg:ml-16 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search..."
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Students
              </CardTitle>
              <UserRound className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCount}</div>
              <p className="text-xs text-gray-500">Currently enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Outpass Requests
              </CardTitle>
              <FileOutput className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outpassCount}</div>
              <p className="text-xs text-gray-500">Pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Room Requests
              </CardTitle>
              <HomeIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roomCount}</div>
              <p className="text-xs text-gray-500">Awaiting assignment</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
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
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;