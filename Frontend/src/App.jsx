import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
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
import {authStore} from "./store/authStore.jsx"
import {Loader} from "lucide-react";
import { useEffect } from 'react';

function App() {

  const {authUser,checkAuth,isCheckingAuth,isAdmin} = authStore();
  useEffect(() => {
    checkAuth();
  },[checkAuth])

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  console.log(authUser);
  console.log(isAdmin);
  console.log(isCheckingAuth);

  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />}/> */}
        <Route path="/" element={authUser? <Home/> : <Navigate to="/login" />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/review" element={<Review />} />
        <Route path="/outpass" element={authUser ? <Outpass /> : <Navigate to="/login" />} />
        <Route path ="/abc" element={<Navbar/>}/>
        <Route path="/logout" element={authUser ? <Logout /> : <Navigate to="/login" />} />
        <Route path="/allotmentGH-1" element={authUser ? <Allotment /> : <Navigate to="/login" />}/>
        {/* <Route path='/allotmentgh1' element={<AllotmentGH1/>}/> */}
        <Route path='/allotmentGH-2' element={authUser?<AllotmentGH2/> : <Navigate to="/login" />}/>
        <Route path='/allotmentGH-3' element={authUser?<AllotmentGH3/>:<Navigate to="/login" />}/>
        <Route path='/allotmentBH-1' element={authUser?<AllotmentBH1/> : <Navigate to="/login" />}/>
        <Route path='/allotmentBH-2' element={authUser?<AllotmentBH2/>:<Navigate to="/login" />}/>
        <Route path='/allotmentBH-3' element={authUser?<AllotmentBH3/>:<Navigate to="/login" />}/>
        <Route path='/allotmentBH-4' element={authUser?<AllotmentBH4/>:<Navigate to="/login" />}/>
        <Route path='/allotmentBH-5' element={authUser?<AllotmentBH5/>:<Navigate to="/login" />}/>
        <Route path='/selection' element={authUser?<HostelSelection/>:<Navigate to="/login" />} />
        <Route path='/admin' element={authUser?<AdminProfile/>:<Navigate to="/login" />}/>
        <Route path='/newprofile' element={authUser?<StudentProfile/>:<Navigate to="/login" />}/>
        {/* <Route path='/abc' element={<NavbarTest/>}/> */}
        <Route path='/adminpage/*'  element={<Admin/>}/>
      </Routes>
    </Router>
    </UserProvider>

  );
}

export default App;