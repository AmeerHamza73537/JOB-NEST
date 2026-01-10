import React from 'react';
import { 
  FaUserCircle, FaBriefcase, FaEye, FaFileDownload, 
  FaPlus, FaEdit, FaMapMarkerAlt, FaLinkedin, FaGithub 
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-8 mb-20 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image with Ring */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white/30 p-1">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden text-gray-400">
                  <FaUserCircle size={120} />
                </div>
              </div>
              <button className="absolute bottom-1 right-1 bg-gray-800 text-white p-2 rounded-full border-2 border-white">
                <FaEdit size={12} />
              </button>
            </div>

            {/* User Info */}
            <div className="text-white text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-2">
                John Doe <MdVerified className="text-blue-300" />
              </h1>
              <p className="text-blue-100 text-lg">Senior Frontend Developer</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm opacity-90">
                <span className="flex items-center gap-1"><FaMapMarkerAlt /> San Francisco, CA</span>
                <span className="bg-green-500 px-3 py-0.5 rounded-full text-xs font-bold">Online</span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex gap-3">
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-xl flex items-center gap-2 transition">
                <Link to='/update-profile'>
                  <FaEdit /> Edit Profile
                </Link>
              </button>
              <button className="bg-white text-blue-700 px-5 py-2 rounded-xl font-bold hover:bg-gray-100 transition">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          
          {/* Column 1: About & Skills */}
          <div className="space-y-6">
            <Card title="About Me">
              <p className="text-gray-600 text-sm leading-relaxed">
                Passionate frontend developer with 5+ years of experience building scalable web applications. I love solving complex problems and designing clean, minimalist user interfaces.
              </p>
              <div className="mt-6">
                <h4 className="font-bold mb-3 text-gray-800">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Tailwind', 'Node.js', 'Python', 'Git', 'Docker'].map(skill => (
                    <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium border border-gray-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Work Experience" hasAdd>
              <ExperienceItem company="TechCorp, Inc." role="Lead Developer" date="2021 - Present" />
              <ExperienceItem company="StartupXYZ" role="Frontend Dev" date="2018 - 2021" />
            </Card>
          </div>

          {/* Column 2: Education & Projects */}
          <div className="space-y-6">
            <Card title="Education" hasAdd>
              <ExperienceItem company="Stanford University" role="MS Computer Science" date="2016 - 2018" />
              <ExperienceItem company="MIT" role="BS Software Engineering" date="2012 - 2016" />
            </Card>
            <Card title="Contact Details">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3"><HiOutlineMail className="text-blue-600" /> john.doe@example.com</div>
                <div className="flex items-center gap-3"><FaLinkedin className="text-blue-600" /> linkedin.com/in/johndoe</div>
                <div className="flex items-center gap-3"><FaGithub className="text-gray-900" /> github.com/johndoe</div>
              </div>
            </Card>
          </div>

          {/* Column 3: Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Looking to hire talent?</h3>
              <p className="text-sm text-gray-500 mb-6">List a job and connect with thousands of qualified professionals.</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition mb-3">
                <Link to='/create-job'>
                  <FaPlus /> Post a Job
                </Link>
              </button>
            </div>

            <Card title="Documents">
              <button className="w-full border-2 border-dashed border-gray-200 hover:border-blue-400 py-4 rounded-2xl flex flex-col items-center gap-2 transition text-gray-500">
                <FaFileDownload size={24} />
                <span className="text-xs font-bold uppercase tracking-wider">Download Resume</span>
              </button>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner code
const StatCard = ({ icon, label, count }) => (
  <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-50 flex flex-col items-center justify-center text-center">
    <div className="text-blue-600 mb-1">{icon}</div>
    <div className="text-xl font-black text-gray-800">{count}</div>
    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">{label}</div>
  </div>
);

const Card = ({ title, children, hasAdd = false }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800 text-lg tracking-tight">{title}</h3>
      {hasAdd && <FaPlus className="text-gray-400 cursor-pointer hover:text-blue-600" />}
    </div>
    {children}
  </div>
);

const ExperienceItem = ({ company, role, date }) => (
  <div className="flex items-start gap-4 mb-6 last:mb-0">
    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 font-bold">
      {company[0]}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 leading-none">{company}</h4>
      <p className="text-sm text-blue-600 font-medium my-1">{role}</p>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
  </div>
);

export default Profile;