import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Admin/Dashboard'
import OutpassRequest from './components/Admin/OutpassRequest';
import RoomRequests from './components/Admin/RoomRequests'
import RoomApprovalPage from './components/Admin/RoomApprovalPage';
import RoomInquiry from './components/Admin/RoomInquiry';
import AdminProfile from './components/Admin/AdminProfile'


export default function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='outpassrequest' element={<OutpassRequest/>}/>
        <Route path='roomrequests' element={<RoomRequests/>}/>
        <Route path='roomrequests/approval' element={<RoomApprovalPage/>}/>
        <Route path='roominquiry' element={<RoomInquiry/>}/>
        <Route path='profile' element={<AdminProfile/>}/>
      </Routes>
    </div>
  )
}
