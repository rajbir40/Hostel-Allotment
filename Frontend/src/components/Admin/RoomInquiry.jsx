import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Loader } from "lucide-react";

export default function RoomInquiry() {
  const host = "http://localhost:8000";
  const [hostels, setHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const fetchHostels = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/gethostel/hostel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const hostelData = await response.json();
      setHostels(hostelData);
    } catch (error) {
      console.error("Error fetching hostels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const handleHostelDetails = (hostel) => {
    setSelectedHostel(hostel);
  };

  const handleCloseHostelDetails = () => {
    setSelectedHostel(null);
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>

      <div className="ml-16 flex-1 overflow-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Available Hostels</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {hostels.map((hostel) => (
                <Card key={hostel.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-lg">{hostel.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleHostelDetails(hostel)}
                      className="w-full mt-2"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Dialog */}
      {selectedHostel && (
        <Dialog open={true} onOpenChange={handleCloseHostelDetails}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold mb-4">{selectedHostel.name}</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <div className="space-y-6 p-4">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <div className="font-medium text-gray-600">Total Rooms</div>
                  <div className="text-2xl font-semibold">{selectedHostel.totalRooms}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Available</div>
                  <div className="text-2xl font-semibold text-green-600">{selectedHostel.availableRooms}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="font-medium">Booked Rooms</div>
                  <div className="font-semibold text-blue-600">{selectedHostel.bookedRooms}</div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="font-medium">Single Rooms</div>
                  <div className="font-semibold">{selectedHostel.singleRooms}</div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="font-medium">Double Rooms</div>
                  <div className="font-semibold">{selectedHostel.doubleRooms}</div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}