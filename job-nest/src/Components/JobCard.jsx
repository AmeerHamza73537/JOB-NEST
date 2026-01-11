import React from "react";
import { FaBuilding, FaMapMarkerAlt, FaDollarSign, FaClock } from "react-icons/fa";

function JobCard() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg flex justify-between items-center">
      {/* Left Section: Job Info */}
      <div className="flex items-center space-x-4">
        {/* Featured Tag */}
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </span>
        {/* Company Logo */}
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
          T
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Senior Frontend Developer</h2>
          <p className="text-gray-600 text-sm">TechCorp Inc. · San Francisco, CA</p>
        </div>
      </div>

      {/* Middle Section: Salary, Time Posted */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2 text-gray-600">
          <FaDollarSign size={16} />
          <p className="text-sm">$120k - $160k</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <FaClock size={16} />
          <p className="text-sm">2 days ago</p>
        </div>
      </div>

      {/* Right Section: Job Tags and Apply Button */}
      <div className="flex items-center space-x-4">
        {/* Job Tags */}
        <div className="flex space-x-2">
          <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">Remote</span>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">React</span>
          <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">TypeScript</span>
          <span className="bg-teal-100 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full">Tailwind CSS</span>
        </div>

        {/* Apply Now Button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;
