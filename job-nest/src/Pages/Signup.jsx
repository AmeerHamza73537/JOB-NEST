import React from "react";
import { useState } from "react";
import OAuth from "../Components/OAuth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();


  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if(formData.password.length < 8) {
        alert('Password must be at least 8 characters.')
        return
      }
      if (!res.ok || data.success === false){
        setLoading(false)
        setError(data.message || 'Failed to create account')
        return
      }
      
      setLoading(false)
      setError(null)
      navigate('/sign-in')

    } catch (error) {
      setLoading(false)
      setError(error.message)
      console.log(error.message);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-[#3f7fb0] text-white flex-col justify-center items-center px-12">
        <h1 className="text-4xl font-bold text-center leading-snug">
          Start Your Career <br /> Journey
        </h1>
        <p className="mt-6 text-center text-lg opacity-90 max-w-md">
          Create your profile, showcase your skills, and connect with top
          employers worldwide.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] rounded-lg flex items-center justify-center text-white font-bold">
              JN
            </div>
            <span className="text-xl font-semibold">JobNest</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Create your account</h2>
          <p className="text-gray-500 mb-6">
            Join millions finding their dream careers
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] hover:font-bold hover:shadow-xl hover:cursor-pointer text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? 'Creating...':'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">
              Or sign up with
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Only */}
          {/* <button className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition"> */}
            <OAuth />
          {/* </button> */}

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-teal-600 font-medium">
              Sign in
            </Link>
          </p>

          <p className="text-xs text-gray-400 text-center mt-4">
            By creating an account, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
