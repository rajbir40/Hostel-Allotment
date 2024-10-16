import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Forget from './components/Forget';
import SignIn from './components/signin';
import Signup from "./components/Signup";
import Navbar from './components/Navbar/Navbar.jsx'
import Review from "./components/Review"
import Outpass from './components/Outpass/outpass.jsx';
import Profile from './components/Profile/Profile.jsx';
import Logout from './components/logout.jsx';
import Update from './components/Update.jsx';
import { UserProvider } from './context/UserContext.jsx';
import AllotmentGH1 from './components/Allotment/AllotmentGH1.jsx';
import HostelSelection from './components/Allotment/HostelSelection.jsx';
import AllotmentGH2 from './components/Allotment/AllotmentGH2.jsx';
import Allotment from './components/Allotment/Allotment.jsx';
import AdminProfile from './components/Profile/AdminProfile.jsx';
import NewProfile from './components/Profile/NewProfile.jsx';
function App() {
  return (
    <UserProvider>
    <Router><Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/review" element={<Review />} />
        <Route path="/outpass" element={<Outpass />} />
        <Route path="/profile" element ={<Profile/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/alloGh1" element={<Allotment />}/>
        <Route path='/allotmentgh1' element={<AllotmentGH1/>}/>
        <Route path='allotmentgh2' element={<AllotmentGH2/>}/>
        <Route path='/selection' element={<HostelSelection/>} />
        <Route path='/admin' element={<AdminProfile/>}/>
        <Route path='/newprofile' element={<NewProfile/>}/>
      </Routes>
    </Router>
    </UserProvider>

  );
}

export default App;