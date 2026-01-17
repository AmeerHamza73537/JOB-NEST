import React, { useState } from 'react';
import { 
  FaBriefcase, FaDollarSign, FaClock, FaListUl, 
  FaRocket, FaTrash, FaPlus, FaCheckCircle 
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    workType: 'Full-Time',
    location: 'Remote',
    address: '',
    maxSalary: '',
    minSalary: '',
    deadline: '',
    qualifications: '',
    skills: '',
  })

  const handleChange = async (e) => {
      setFormData({
        ...formData,
        [e.target.id] : e.target.value,
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      
      const res = await fetch('/api/listing/create-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          // userRef: currentUser._id,
      })
      })
      const data = await res.json()
      setLoading(false)
      if(!res.ok || data.success === false) {
        console.log(data.message);
        return
      }
      navigate('/')
    } catch (error) {
      console.log(error);
      setError(error.message)
      setLoading(false)
    }
  }
  return (
    <form className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900" onSubmit={handleSubmit}>
  <div className="max-w-4xl mx-auto">

    {/* HEADER */}
    <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
      <div>
        <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
          <FaRocket /> Recruiter Dashboard
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Post a New Job</h1>
        <p className="text-slate-500 mt-2 text-lg">
          Find your next great hire by providing detailed job information.
        </p>
      </div>
      <button
        type="submit"
        className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
      >
        {loading ? 'Creating' : 'Publish a Job'}
      </button>
    </div>

    <div className="space-y-8">

      {/* SECTION 1 */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">1</span>
          Basic Job Details
        </h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Job Title</label>
            <input
              id='jobTitle'
              type="text"
              name="title"
              placeholder="e.g. Senior Full Stack Developer"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Company</label>
            <input
              id='company'
              type="text"
              name="title"
              placeholder="e.g. Your Company Name"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Work Type</label>
              <select
                id='workType'
                name="workType"
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer"
                required
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Freelance</option>
                <option>Internship</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Location / Remote</label>
              <select
                id='location'
                name="locationType"
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer"
                required
              >
                <option>Remote</option>
                <option>On-site</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Address</label>
            <input
              id='address'
              type="text"
              name="title"
              placeholder="e.g. Los Angeles, US"
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none"
            />
          </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Job Description</label>
            <textarea
              id='description'
              name="description"
              rows="6"
              placeholder="Tell candidates about the role, the team, and the mission..."
              onChange={handleChange}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] resize-none"
              required
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm">2</span>
          Salary & Timeframe
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <FaDollarSign /> Salary Range (Annual)
            </label>
            <div className="flex items-center gap-3">
              <input
                id='minSalary'
                type="number"
                name="salaryMin"
                placeholder="Min"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
              <span className="text-slate-400">—</span>
              <input
                id='maxSalary'
                type="number"
                name="salaryMax"
                placeholder="Max"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <FaClock /> Application Deadline
            </label>
            <input
              id='deadline'
              type="date"
              name="deadline"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              required
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">3</span>
          Qualifications & Skills
        </h3>

        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-700">Required Qualifications</label>
            <input
              id='qualifications'
              type="text"
              name="qualifications"
              placeholder="e.g. Bachelor's Degree in CS"
              onChange={handleChange}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Keywords / Skills</label>
            <input
              id='skills'
              type="text"
              name="skills"
              placeholder="React, Node.js, AWS"
              onChange={handleChange}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl"
              required
            />
          </div>
        </div>
      </section>

    </div>
  </div>
</form>

  );
};

export default PostJob;