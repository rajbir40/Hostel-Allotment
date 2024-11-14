import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpenCheck,
  Building2,
  FileOutput,
  MessageSquare,
  Share2,
  LogOut,
  Menu
} from "lucide-react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            window.location.href = '/login';
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const navigationItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/outpass", icon: BookOpenCheck, label: "Generate Outpass" },
    { path: "/selection", icon: Building2, label: "Book Room" },
    { path: "/newprofile", icon: Share2, label: "My Profile" },
    
  ];

  const isActivePath = (path) => location.pathname === path;

  useEffect(() => {
    setIsCollapsed(true);
  }, [location.pathname]);

  return (
    <div className={`fixed left-0 top-0 h-full border-r bg-white transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
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
                className={`w-full justify-start mb-1 ${isCollapsed ? 'px-2' : 'px-4'}`}
              >
                <item.icon className={`h-4 w-4 ${isCollapsed ? 'mr-0' : 'mr-2'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t pt-4 px-2 space-y-1">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
          >
            <LogOut className={`h-4 w-4 ${isCollapsed ? 'mr-0' : 'mr-2'}`} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
