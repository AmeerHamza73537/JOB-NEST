import React, { useState } from 'react';
import { 
  FaBriefcase, FaDollarSign, FaClock, FaListUl, 
  FaRocket, FaTrash, FaPlus, FaCheckCircle 
} from 'react-icons/fa';

const PostJob = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
              <FaRocket /> Recruiter Dashboard
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">Post a New Job</h1>
            <p className="text-slate-500 mt-2 text-lg">Find your next great hire by providing detailed job information.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Publish Job Listing
             </button>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* SECTION 1: CORE INFORMATION */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">1</span>
               Basic Job Details
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Job Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior Full Stack Developer"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Work Type</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition cursor-pointer appearance-none">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Location / Remote</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition cursor-pointer appearance-none">
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Job Description</label>
                <textarea 
                  rows="6"
                  placeholder="Tell candidates about the role, the team, and the mission..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition resize-none"
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: COMPENSATION & TIME */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm">2</span>
               Salary & Timeframe
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <FaDollarSign className="text-slate-400" /> Salary Range (Annual)
                </label>
                <div className="flex items-center gap-3">
                  <input type="number" placeholder="Min" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition" />
                  <span className="text-slate-400">—</span>
                  <input type="number" placeholder="Max" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <FaClock className="text-slate-400" /> Application Deadline
                </label>
                <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition" />
              </div>
            </div>
          </section>

          {/* SECTION 3: QUALIFICATIONS & SKILLS */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">3</span>
               Qualifications & Skills
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700">Required Qualifications</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. 5+ years experience in React"
                    className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition"
                  />
                  <button className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition">
                    <FaPlus />
                  </button>
                </div>
                {/* List of Qualifications */}
                <div className="space-y-2 mt-2">
                   {['Bachelor’s Degree in CS', 'Fluent in English'].map((item, idx) => (
                     <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <span className="text-sm text-slate-600 flex items-center gap-2">
                         <FaCheckCircle className="text-blue-500" /> {item}
                       </span>
                       <button className="text-slate-300 hover:text-red-500 transition"><FaTrash size={12}/></button>
                     </div>
                   ))}
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-sm font-bold text-slate-700">Keywords / Skills</label>
                <input 
                  type="text" 
                  placeholder="Type a skill and press enter..."
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition"
                />
                <div className="flex flex-wrap gap-2">
                   {['React', 'Node.js', 'AWS', 'TypeScript'].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-2">
                       {skill} <FaPlus className="rotate-45 cursor-pointer" />
                     </span>
                   ))}
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER ACTIONS */}
          <div className="flex items-center justify-between p-6 bg-slate-900 rounded-[2rem] text-white">
            <div className="hidden md:block">
              <p className="font-bold">Ready to find your hire?</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest">Visibility: Public</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-10 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition shadow-lg shadow-blue-900/20">
                Post Job Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostJob;