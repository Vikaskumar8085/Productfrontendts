import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/AuthPages/Login/Login';
import Signup from './Pages/AuthPages/SignUp/Signup';
import ForgetPassword from './Pages/AuthPages/ForgetPassword/ForgetPassword';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/DashboardPages/Dashboard/Dashboard';
import 'react-quill/dist/quill.snow.css';
import Error from './Pages/ErrorPage/Error';
import Candidate from './Pages/DashboardPages/Candidate/Candidate';
import Designation from './Pages/DashboardPages/Designation/Designation';
import Profile from './Pages/DashboardPages/Profile/Profile';
import CandidateUpload from './Pages/DashboardPages/Candidate/CandidateUpload';
import Client from './Pages/DashboardPages/Client/Client';
import Region from './Pages/DashboardPages/Region/Region';
import Tag from './Pages/DashboardPages/Tag/Tag';
import Education from './Pages/DashboardPages/Education/Education';
import Reason from './Pages/DashboardPages/Reason/Reason';
import { Toaster } from 'react-hot-toast';
import Security from './Pages/DashboardPages/SecurityQAPage/Security';
import ClientSecurity from './Pages/DashboardPages/ClientSecurityPage/ClientSecurity';
import ResetPassword from './Pages/AuthPages/ResetPassword/ResetPassword';
import ReasonPage from './Pages/ReasonLeavingJob/ReasonLeavingJob';
import ReasonLeavingJob from './Pages/ReasonLeavingJob/ReasonLeavingJob';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/verify/:id" element={<div>verify</div>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/candidate" element={<Candidate />} />
        <Route path="/bulk-upload" element={<CandidateUpload />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/client" element={<Client />} />
        <Route path="/region" element={<Region />} />
        <Route path="/education" element={<Education />} />
        <Route path="/tag" element={<Tag />} />
        <Route path="/Reason" element={<Reason />} />
        <Route path="/security" element={<Security />} />
        <Route path="/client-security" element={<ClientSecurity />} />
        <Route path='/resetpassword/:resetToken' element={<ResetPassword />} />
        <Route path="/reason-leaving-job/:id" element={<ReasonLeavingJob />} />
        <Route path="*" element={<Error />} />

      </Routes>
      <Toaster />
    </>
  );
}

export default App;
