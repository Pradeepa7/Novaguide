import './App.css';
import React, { useState, useEffect } from 'react';
import Registration from './Components/Registration';
import '../node_modules/bootstrap/dist/js/bootstrap';
import { Route, Routes, Navigate } from 'react-router-dom';
import Pricing from './Components/Pricing';
import Submission from './Components/Submission';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';


function App() {
  const [isAuth, setIsAuth] = useState(false); // State to track user authentication


// Function to get JWT token from localStorage and set authentication status
  const getTokenAndCheck = () => {
    const jwt = localStorage.getItem("jwtToken");
    console.log(jwt); // Debug: log token
    setIsAuth(jwt !== null); // Set isAuth to true if token exists
  }
  useEffect(() => {
    
    getTokenAndCheck(); // Check token when component mounts

     // Listen for custom "tokenUpdated" event to update authentication status
    window.addEventListener("tokenUpdated",getTokenAndCheck);

    // Clean up event listener on component unmount
    return()=>{
      window.removeEventListener("tokenUpdated",getTokenAndCheck);
    };

  }, []);
  console.log('isAuth',isAuth); // Debug: log current authentication state

  return (
   // Set up layout with Bootstrap classes and full viewport height
    <div className='d-flex justify-content-center align-items-center bg-info-subtle' style={{ height: '100vh' }}>

      {/* Define application routes */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Registration />}/>
        <Route path='/pricing' element={<Pricing />}/>
        <Route path='/success' element={<Submission />}/>
        <Route path='/login' element={<Login />}/>
        {/* Protected route: only show dashboard if authenticated, else redirect to login */}
        <Route path='/dashboard' element={ isAuth ? <Dashboard/> : <Navigate to="/login"/>}/>
      </Routes>

    </div>


  );
}

export default App;
