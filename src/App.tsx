import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/AuthPages/Login/Login';
import Signup from './Pages/AuthPages/SignUp/Signup';
import ForgetPassword from './Pages/AuthPages/ForgetPassword/ForgetPassword';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
      </Routes>


    </>
  );
}

export default App;
