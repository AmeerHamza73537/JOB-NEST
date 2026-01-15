import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiEyeLine } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import OAuth from "../Components/OAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { signinStart, signinSuccess, signinFailure } from '../redux/user/UserSlice.js'
import { useDispatch, useSelector } from 'react-redux'

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData ] = useState({})  
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(signinStart())
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // ensure cookies (Set-Cookie) are accepted and sent
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(!res.ok || data.success === false){
        dispatch(signinFailure(data.message))
        return
      }
      dispatch(signinSuccess(data))
      navigate('/profile')
    } catch (error) {
      console.log(error);
      dispatch(signinFailure(error.message))
    }
  }

  return (
    <section className="flex min-h-screen">
      {/* Left side - form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-12">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] rounded-lg flex items-center justify-center text-white font-bold">
              JN
            </div>
            <span className="text-xl font-semibold">JobNest</span>
          </div>

        {/* Welcome */}
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-500 mb-6">
            Sign in to continue your job search journey
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="relative">
              <MdOutlineMailOutline className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"/>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleChange}
              />
              <RiEyeLine
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
              <Link
                to="/forgot-password"
                className="absolute top-1/2 right-12 -translate-y-1/2 text-teal-500 text-sm"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
            //   disabled={loading}
              type="submit"
              className="bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] w-full text-white py-3 rounded-lg font-semibold hover:font-bold hover:shadow-xl hover:cursor-pointer transition"
            >
              {/* {loading ? 'Signing in...' : 'Sign in'} */}
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-3 text-gray-400 text-sm">Or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google OAuth */}
          <OAuth />

          {/* Sign Up */}
          <p className="mt-6 text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-teal-500 font-medium ">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - info panel */}
      <div className="w-1/2 bg-[#3f7fb0] flex flex-col justify-center items-center text-white p-12">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Your Next Opportunity Awaits
        </h2>
        <p className="text-lg text-center">
          Join over 10 million professionals who've found their dream careers
          through JobFlow.
        </p>
      </div>
    </section>
  );
}
