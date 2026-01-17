import React from 'react'
import { useSelector } from 'react-redux'

export default function LoggedHero() {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="min-h-screen flex items-start justify-start pt-32 pl-24 bg-slate-50">
      
      {/* HERO CONTENT */}
      <div className="max-w-2xl">

        {/* GREETING */}
        <div className="flex items-center gap-3">
          <p className="text-5xl font-semibold text-blue-600">
            Hi,
          </p>
          <p className="text-5xl font-extrabold text-emerald-600">
            {currentUser?.name}
          </p>
        </div>

        {/* TAGLINE */}
        <p className="mt-5 text-lg text-slate-500 max-w-xl leading-relaxed">
          Welcome back! Take control of your career or hiring journey.
          Discover opportunities, connect with talent, and manage your jobs easily.
        </p>

        {/* TOP BUTTONS */}
        <div className="mt-10 grid grid-cols-2 gap-4 max-w-xl">
          <button className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:cursor-pointer transition shadow-md">
            Find Jobs
          </button>

          <button className="w-full px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 hover:cursor-pointer transition shadow-md">
            Hire People
          </button>
        </div>

        {/* FULL WIDTH BUTTON */}
        <div className="mt-4 max-w-xl">
          <button className="w-full px-6 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-200 hover:cursor-pointer transition ">
            Show Your Posted Jobs
          </button>
        </div>

      </div>
    </div>
  )
}
