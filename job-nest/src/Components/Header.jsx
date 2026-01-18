import React from "react";
import { useSelector } from "react-redux";
// import { Link, Links } from 'react-router-dom'
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // console.log(currentUser);

  return (
    <header className=" sticky top-0 z-50 glass-bg backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl h-16 mx-auto px-4 py-3 flex items-center justify-between">
        <div className="">
          <Link to="/">
            <span className="w-10 h-10 bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] rounded-lg p-3 mx-3 text-white font-bold">
              JN
            </span>
            <span className="font-display text-xl font-bold text-foreground">
              JOB NEST
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to='/search-job' className="text-[#7A8A9E] hover:text-black transition">Find Jobs</Link>
          <Link to='/' className="text-[#7A8A9E] hover:text-black transition">Find Talents</Link>
          <Link to='/' className="text-[#7A8A9E] hover:text-black transition">Why JobNest?</Link>
        </div>
        {currentUser ? (
          <Link to="/profile">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="h-10 w-10 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold uppercase">
                {currentUser?.name?.charAt(0)}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <button className="hover:bg-amber-400 hover:text-white font-semibold px-6 py-2 rounded-full hover:bg-[#E6AE45] transition">
              <Link to="/sign-in">Sign in</Link>
            </button>
            <button
              className="bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0]
       text-white font-medium px-6 py-3 rounded-full
       shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
            >
              <Link to="/sign-up">Get Started</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
