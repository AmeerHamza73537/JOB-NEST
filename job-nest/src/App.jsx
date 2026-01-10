import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Components/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import PostJob from './Pages/postJob'
import UpdateProfile from './Pages/UpdateProfile'
import Footer from './Components/Footer'
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
          <Route path='/profile'element={<Profile/>} />
          <Route path='/create-job'element={<PostJob/>} />
          <Route path='/update-profile'element={<UpdateProfile/>} />
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
