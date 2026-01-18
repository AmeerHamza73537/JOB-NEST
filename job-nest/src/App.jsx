import React from 'react'
import { useState } from 'react'
import Header from './Components/Header.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import PostJob from './Pages/PostJob'
import UpdateProfile from './Pages/UpdateProfile'
import Footer from './Components/Footer'
import JobCard from './Components/JobCard';
import SearchJobs from './Pages/SearchJobs';
import SearchTalent from './Pages/SearchTalent.jsx';
import Job from './Pages/Job.jsx';
import ApplyJob from './Pages/ApplyJob.jsx';
// import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/'element={<Home/>} />
          <Route path='/sign-in'element={<Signin/>} />
          <Route path='/sign-up'element={<Signup/>} />
          <Route path='/profile/:userId?' element={<Profile/>} />
          <Route path='/create-job'element={<PostJob/>} />
          <Route path='/update-profile'element={<UpdateProfile/>} />
          <Route path='/search-job'element={<SearchJobs/>} />
          <Route path='/search-talent'element={<SearchTalent/>} />
          <Route path='/listing/:listingId'element={<Job/>} />
          <Route path='/apply/:listingId'element={<ApplyJob/>} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
