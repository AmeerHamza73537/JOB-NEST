import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import JobCard from '../JobCard'
import { Link } from 'react-router-dom'

export default function LoggedHero() {
  const { currentUser } = useSelector((state) => state.user)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(false)
  const [ error, setError] = useState(false)
  const [showListings, setShowLisitngs] = useState(false)

  const handleClick = async (e) => {
    try {
      setLoading(true)
    setError(false)
    const res = await fetch(`/api/user/listings/${currentUser._id}`, {
      credentials: 'include'
    })
    if(!res.ok) {
      const text = await res.text().catch(() => null)
      console.error('Listings fetch failed:', res.status, text)
      return
    }
    const data = await res.json()
    setShowLisitngs(true)
    setListings(data)
    setLoading(false)
    } catch (error) {
      console.log(error);
      setError(true)
      setLoading(false)
    }
  }

  const handleHideListing = async () => {
    setShowLisitngs(false)
    setListings([])
  }


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
            <Link to={'/search-job'}>
              Find Jobs
            </Link>
          </button>

          <button className="w-full px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 hover:cursor-pointer transition shadow-md">
            <Link to={'/create-job'}>
              Hire People
            </Link>
          </button>
        </div>

        {/* FULL WIDTH BUTTON */}
        <div className="mt-4 max-w-xl">
          {!showListings ? (
            <button 
            onClick={handleClick}
            className="w-full px-6 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-200 hover:cursor-pointer transition ">
            Show Your Posted Jobs
          </button>
          ) : (
            <button 
            onClick={handleHideListing}
            className="w-full px-6 py-3 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-200 hover:cursor-pointer transition ">
            Hide Your Posted Jobs
          </button>
          )}
          
          
          <div className="">
            {loading && <p className="text-slate-500 mt-2">Loading your jobs...</p>}
            {error && <p className="text-red-500 mt-2">Error loading jobs. Please try again.</p>}
            {!loading && error && listings.length === 0 && <p className="text-slate-500 mt-2">No jobs posted yet.</p>}
            {!loading && listings.map((listing) => (
                <JobCard key={listing._id} listing={listing} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
