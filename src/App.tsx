import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/AuthPages/Login/Login';
import Signup from './Pages/AuthPages/SignUp/Signup';
import ForgetPassword from './Pages/AuthPages/ForgetPassword/ForgetPassword';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/AdminPages/Dashboard';
import Profile from './Pages/Profile/Profile';

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

        <Route path='*' element={<div className='bg-gray-100 min-h-screen'>asdf</div>} />



      </Routes>


    </>
  );
}

export default App;
