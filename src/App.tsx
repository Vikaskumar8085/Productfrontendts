import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/AuthPages/Login/Login';
import Signup from './Pages/AuthPages/SignUp/Signup';
import ForgetPassword from './Pages/AuthPages/ForgetPassword/ForgetPassword';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/AdminPages/Dashboard';
import Profile from './Pages/Profile/Profile';
import Product from './Pages/ProductPage/Product';
import 'react-quill/dist/quill.snow.css';
import Error from './Pages/ErrorPage/Error';

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
        <Route path='/product' element={<Product />} />
        <Route path='*' element={<Error />} />
      </Routes>


    </>
  );
}

export default App;
