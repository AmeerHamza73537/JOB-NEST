import React, { useState } from 'react';
import { 
  FaCamera, FaSave, FaTimes, FaPlus, FaTrash, 
  FaLinkedin, FaGithub, FaBriefcase, FaGraduationCap, 
  FaFileDownload
} from 'react-icons/fa';

const UpdateProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    about: "Passionate frontend developer with 5+ years of experience in building scalable web applications.",
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* TOP NAVIGATION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Edit Profile</h1>
            <p className="text-slate-500">Manage your public presence and job preferences.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-600 hover:bg-slate-100 transition shadow-sm">
              Cancel
            </button>
            <button className="flex-1 md:flex-none px-8 py-2.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: AVATAR & QUICK LINKS */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
              <div className="relative w-40 h-40 mx-auto group">
                <div className="w-full h-full rounded-full border-4 border-slate-50 shadow-inner overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop" alt="User" />
                </div>
                <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full border-4 border-white cursor-pointer hover:scale-110 transition shadow-md">
                  <FaCamera size={16} />
                  <input type="file" className="hidden" />
                </label>
              </div>
              <h2 className="mt-4 font-bold text-lg">{profile.fullName}</h2>
              <p className="text-slate-400 text-sm">JPG or PNG, Max 2MB</p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="font-bold mb-4 flex items-center gap-2 tracking-tight">Social Links</h3>
              <div className="space-y-3">
                <div className="relative">
                  <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="linkedin.com/in/username" 
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div className="relative">
                  <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="github.com/username" 
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: MAIN FORM */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PERSONAL DETAILS */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-6">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.fullName}
                    onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Professional Title</label>
                  <input 
                    type="text" 
                    value={profile.title}
                    onChange={(e) => setProfile({...profile, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                  <input 
                    type="text" 
                    value={profile.location}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Availability Status</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition appearance-none cursor-pointer">
                    <option>Open to Work</option>
                    <option>Freelance / Contract</option>
                    <option>Not looking for jobs</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BIO SECTION */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-4">About Me</h3>
              <textarea 
                rows="4"
                value={profile.about}
                onChange={(e) => setProfile({...profile, about: e.target.value})}
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            {/* WORK EXPERIENCE (MOCK LIST) */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Experience</h3>
                <button className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition">
                  <FaPlus size={12} /> Add New
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="group flex justify-between items-center p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100"><FaBriefcase /></div>
                    <div>
                      <h4 className="font-bold">Lead Designer</h4>
                      <p className="text-xs text-slate-400 font-medium tracking-wide">TECHCORP INC • 2021 - PRESENT</p>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition p-2">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
            {/* SKILLS SECTION */}
<div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
  <h3 className="text-xl font-bold mb-2">Skills</h3>
  <p className="text-sm text-slate-500 mb-6">Add your technical expertise and soft skills.</p>
  
  <div className="space-y-4">
    {/* Skill Input */}
    <div className="flex gap-2">
      <input 
        type="text" 
        placeholder="e.g. React, Project Management, Figma"
        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
      />
      <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition">
        Add
      </button>
    </div>

    {/* Skill Tags Container */}
    <div className="flex flex-wrap gap-2 pt-2">
      {['React', 'Tailwind CSS', 'Node.js', 'UI Design', 'Python'].map((skill) => (
        <div 
          key={skill} 
          className="group flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 font-medium text-sm transition hover:bg-blue-100"
        >
          {skill}
          <button className="text-blue-300 group-hover:text-blue-600 transition">
            <FaTimes size={12} />
          </button>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* UPLOAD RESUME SECTION */}
<div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-xl font-bold">Resume / CV</h3>
    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Optional</span>
  </div>

  <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-all group cursor-pointer">
    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
    
    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
      <FaFileDownload size={28} />
    </div>
    
    <p className="text-slate-900 font-bold">Click to upload or drag and drop</p>
    <p className="text-slate-400 text-sm mt-1">PDF, DOCX (Max 5MB)</p>
  </div>

  {/* Existing Resume Item (Visible if a file is already uploaded) */}
  <div className="mt-4 flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-red-50 text-red-500 rounded-lg">
        <span className="font-black text-xs">PDF</span>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-700">John_Doe_Resume_2026.pdf</p>
        <p className="text-xs text-slate-400">Uploaded Jan 10, 2026</p>
      </div>
    </div>
    <button className="text-slate-300 hover:text-red-500 transition p-2">
      <FaTrash size={14} />
    </button>
  </div>
</div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;