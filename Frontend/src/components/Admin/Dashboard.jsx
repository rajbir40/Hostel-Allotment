import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, FileOutput, HomeIcon } from "lucide-react";
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

      // Fetch recent activities for approvals and declines
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
    <div className="min-h-screen bg-gray-50 waves-container" style={{background:'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)'}}>
      <Sidebar />

      <div className="lg:ml-64 p-8">
        <div className="flex justify-center items-center text-center mb-8">
          <h1 className="text-3xl font-bold" style={{padding: '1%',position: 'fixed',top: '0',justifyContent: 'center',width: '100%',display: 'flex',backgroundColor: 'white',color: '#0000FF'}}>Dashboard</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={{padding:'40px'}}>
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

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle style={{color:'#0000FF'}}>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                No recent activity to display
              </p>
            </CardContent>
          </Card>
        </div>

        
        <div className="waves" style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', height: '40px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
            </defs>
            <g className="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
