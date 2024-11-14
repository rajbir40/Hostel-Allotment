import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Forget from './components/Forget';
import SignIn from './components/signin';
import Signup from "./components/Signup";
import Navbar from './components/Navbar/Navbar.jsx'
import Review from "./components/Review"
import Outpass from './components/Outpass/outpass.jsx';
import Logout from './components/logout.jsx';
import { UserProvider } from './context/UserContext.jsx';
import HostelSelection from './components/Allotment/HostelSelection.jsx';
import AllotmentGH2 from './components/Allotment/AllotmentGH2.jsx';
import Allotment from './components/Allotment/Allotment.jsx';
import AdminProfile from './components/Profile/AdminProfile.jsx';
import StudentProfile from './components/Profile/NewProfile.jsx';
import Admin from './AdminRoutes.jsx'
import AllotmentBH1 from './components/Allotment/AllotmentBH1.jsx';
import AllotmentBH2 from './components/Allotment/AllotmentBH2.jsx';
import AllotmentBH3 from './components/Allotment/AllotmentBH3.jsx';
import AllotmentGH3 from './components/Allotment/AllotmentGH3.jsx';
import AllotmentBH4 from './components/Allotment/AllotmentBH4.jsx';
import AllotmentBH5 from './components/Allotment/AllotmentBH5.jsx';

function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/review" element={<Review />} />
        <Route path="/outpass" element={<Outpass />} />
        <Route path ="/abc" element={<Navbar/>}/>
        <Route path="/logout" element={<Logout />} />
        <Route path="/allotmentGH-1" element={<Allotment />}/>
        {/* <Route path='/allotmentgh1' element={<AllotmentGH1/>}/> */}
        <Route path='/allotmentGH-2' element={<AllotmentGH2/>}/>
        <Route path='/allotmentGH-3' element={<AllotmentGH3/>}/>
        <Route path='/allotmentBH-1' element={<AllotmentBH1/>}/>
        <Route path='/allotmentBH-2' element={<AllotmentBH2/>}/>
        <Route path='/allotmentBH-3' element={<AllotmentBH3/>}/>
        <Route path='/allotmentBH-4' element={<AllotmentBH4/>}/>
        <Route path='/allotmentBH-5' element={<AllotmentBH5/>}/>
        <Route path='/selection' element={<HostelSelection/>} />
        <Route path='/admin' element={<AdminProfile/>}/>
        <Route path='/newprofile' element={<StudentProfile/>}/>
        {/* <Route path='/abc' element={<NavbarTest/>}/> */}
        <Route path='/adminpage/*'  element={<Admin/>}/>
      </Routes>
    </Router>
    </UserProvider>

  );
}

export default App;