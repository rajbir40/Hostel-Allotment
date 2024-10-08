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
import UserContextProvider from './context/UserContextProvider.jsx';
import Allotment from './components/Allotment/Allotment.jsx';
import HostelSelection from './components/Allotment/HostelSelection.jsx';

function App() {
  return (
    <UserContextProvider>
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
        <Route path="/update" element={<Update/>} />
        <Route path='/allotment' element={<Allotment/>}/>
        <Route path='/selection' element={<HostelSelection/>} />

        
      </Routes>
    </Router>
    </UserContextProvider>

  );
}

export default App;