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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/verify/:id' element={<div>verify</div>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/candidate' element={<Candidate />} />
        <Route path='/Reason' element={ <>h</>} />
        <Route path='/designation' element={<Designation />} />
        <Route path='*' element={<Error />} />
      </Routes>


    </>
  );
}

export default App;
