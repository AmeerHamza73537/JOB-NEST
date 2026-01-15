import React, { useState, useEffect } from "react";
import {
  FaCamera,
  FaSave,
  FaTimes,
  FaPlus,
  FaTrash,
  FaLinkedin,
  FaGithub,
  FaBriefcase,
  FaGraduationCap,
  FaFileDownload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/UserSlice.js";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    title: '',
    location: '',
    status: '',
    bio: '',
  });
  const [experience, setExperience] = useState([{ jobTitle: "", company: "", period: "" }]);
  const [skills, setSkills] = useState([""]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  // Initialize form state from currentUser
  useEffect(() => {
    if (currentUser) {
      setFormData({
        image: currentUser.avatar || '',
        name: currentUser.name || '',
        title: currentUser.title || '',
        location: currentUser.location || '',
        status: currentUser.status || '',
        bio: currentUser.bio || currentUser.about || '',
      });

      setExperience(
        currentUser.workExperience && currentUser.workExperience.length
          ? currentUser.workExperience.map((e) => ({ jobTitle: e.role || e.jobTitle || '', company: e.company || '', period: e.period || '' }))
          : [{ jobTitle: "", company: "", period: "" }]
      );

      setSkills(currentUser.skills && currentUser.skills.length ? currentUser.skills : [""]);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Simple placeholder handling for file input — store file name for now
      setFormData((prev) => ({ ...prev, [name]: files && files[0] ? files[0].name : '' }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    setExperience((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [name]: value };
      return copy;
    });
  };

  const handleSkillChange = (e, index) => {
    const value = e.target.value;
    setSkills((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleAdd = (section) => {
    if (section === "experience") {
      setExperience((prev) => [...prev, { jobTitle: "", company: "", period: "" }]);
    }
    if (section === "skills") {
      setSkills((prev) => [...prev, ""]);
    }
  };

  const handleRemoveExperience = (index) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const payload = {
        ...formData,
        bio: formData.bio,
        workExperience: experience,
        skills: skills.filter((s) => s && s.trim() !== ''),
      };
      const res = await fetch(`http://localhost:3000/api/user/update-profile/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message || 'Update failed'));
        return;
      }
      setUpdateSuccess(true);
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        {/* TOP NAVIGATION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Edit Profile
            </h1>
            <p className="text-slate-500">
              Manage your public presence and job preferences.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 rounded-2xl font-semibold text-slate-600 hover:bg-slate-100 transition shadow-sm">
              Cancel
            </button>
            <Link to='/profile'>
              <button
              onClick={handleSubmit}
              className="flex-1 md:flex-none px-8 py-2.5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Save Changes
            </button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: AVATAR & QUICK LINKS */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 text-center">
                <div className="relative w-40 h-40 mx-auto group">
                  <div className="w-full h-full rounded-full border-4 border-slate-50 shadow-inner overflow-hidden">
                    {/* Avatar Image */}
                  </div>
                  <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full border-4 border-white cursor-pointer hover:scale-110 transition shadow-md">
                    <FaCamera size={16} />
                    <input
                      type="file"
                      name="image"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <h2 className="mt-4 font-bold text-lg">{currentUser.name}</h2>
                <p className="text-slate-400 text-sm">JPG or PNG, Max 2MB</p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="font-bold mb-4 flex items-center gap-2 tracking-tight">
                  Social Links
                </h3>
                <div className="space-y-3">
                  <div className="relative">
                    <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="linkedin"
                      placeholder="linkedin.com/in/username"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="relative">
                    <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="github"
                      placeholder="github.com/username"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                      onChange={handleChange}
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
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Availability Status
                    </label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition appearance-none cursor-pointer">
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
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-3xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition resize-none"
                />
              </div>

              {/* WORK EXPERIENCE (DYNAMIC) */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Experience</h3>
                  <button
                    type="button"
                    onClick={() => handleAdd('experience')}
                    className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition"
                  >
                    <FaPlus size={12} /> Add New
                  </button>
                </div>

                {experience.map((exp, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="jobTitle"
                          placeholder="Job Title"
                          value={exp.jobTitle}
                          onChange={(e) => handleExperienceChange(e, index)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                        />
                        <input
                          type="text"
                          name="company"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(e, index)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                        />
                        <input
                          type="text"
                          name="period"
                          placeholder="Period"
                          value={exp.period}
                          onChange={(e) => handleExperienceChange(e, index)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExperience(index)}
                        className="text-slate-300 hover:text-red-500 transition p-2"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* SKILLS SECTION (DYNAMIC) */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-2">Skills</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Add your technical expertise and soft skills.
                </p>

                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. React, Project Management, Figma"
                        value={skill}
                        onChange={(e) => handleSkillChange(e, index)}
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAdd('skills')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
