import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home as HomeIcon, Key, Clock } from "lucide-react";
import Navbar from '../Navbar/Navbar';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Navbar Section */}
      {/* <div className="w-1/5"> */}
        <Navbar />
      {/* </div> */}

      {/* Main Content Section */}
      <div className="hello2 bg-gray-50" style={{ width: "95vw", marginLeft: "auto" }}>
        {/* Hero Section */}
        <div className="mx-auto py-16">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Welcome to Hostel Management
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Simplifying hostel life with quick allotments and instant outpass approvals—right at your fingertips!
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                onClick={() => navigate('/outpass')}
              >
                Generate Outpass
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8"
                onClick={() => navigate('/selection')}
              >
                Book Room
                <Key className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Quick Outpass</h3>
                <p className="text-gray-600">
                  Generate outpass requests instantly and get quick approvals from wardens
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <HomeIcon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Room Booking</h3>
                <p className="text-gray-600">
                  Easy room selection and instant booking system for hassle-free accommodation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Key className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Room Management</h3>
                <p className="text-gray-600">
                  Efficient room management system with real-time availability updates
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 text-center">
            <p className="text-gray-600">
              Experience hassle-free hostel management with our digital solutions.
              <br />
              Get started by selecting one of the options above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
