import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  LayoutDashboard,
  BookOpenCheck,
  Building2,
  FileOutput,
  MessageSquare,
  Share2,
  LogOut,
  Moon,
  ChevronRight,
  Menu
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      path: "/adminpage/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard"
    },
    {
      path: "/adminpage/roomrequests",
      icon: BookOpenCheck,
      label: "Booking Requests"
    },
    {
      path: "/adminpage/roominquiry",
      icon: Building2,
      label: "Room Inquiry"
    },
    {
      path: "/adminpage/outpassrequest",
      icon: FileOutput,
      label: "Outpass Requests"
    },
    {
      path: "#",
      icon: MessageSquare,
      label: "Comment"
    },
    {
      path: "#",
      icon: Share2,
      label: "Share"
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`fixed left-0 top-0 h-full border-r bg-white transition-all duration-300 z-50 ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="font-bold text-xl">DormSpace</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-4 flex flex-col h-[calc(100vh-5rem)] justify-between">
        <nav className="px-2 space-y-1">
          {navigationItems.map((item) => (
            <Link to={item.path} key={item.label}>
              <Button
                variant={isActivePath(item.path) ? "secondary" : "ghost"}
                className={`w-full justify-start mb-1 ${
                  isCollapsed ? 'px-2' : 'px-4'
                }`}
              >
                <item.icon className={`h-4 w-4 ${
                  isCollapsed ? 'mr-0' : 'mr-2'
                }`} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t pt-4 px-2 space-y-1">
          <Link to="#">
            <Button
              variant="ghost"
              className={`w-full justify-start ${
                isCollapsed ? 'px-2' : 'px-4'
              }`}
            >
              <LogOut className={`h-4 w-4 ${
                isCollapsed ? 'mr-0' : 'mr-2'
              }`} />
              {!isCollapsed && <span>Logout</span>}
            </Button>
          </Link>
          
          <div className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } px-4 py-2`}>
            {!isCollapsed && (
              <div className="flex items-center">
                <Moon className="h-4 w-4 mr-2" />
                <span>Dark Mode</span>
              </div>
            )}
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              className={isCollapsed ? 'ml-0' : 'ml-2'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;