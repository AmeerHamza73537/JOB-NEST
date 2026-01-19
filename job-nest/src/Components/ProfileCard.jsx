import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileCard({ user }) {
  return (
    <>
      <div className="w-full max-w-5xl rounded-xl border border-gray-200 bg-white p-6 my-3 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-start gap-4">
            {/* User avatar */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
              {user.name.charAt(0)}
            </div>

            {/* User info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>{user.title}</span>
                <span>•</span>
                <span>{user.location}</span>
                <span>•</span>
                <span>Joined Job Nest on {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Skills */}
              <div className="mt-3 flex flex-wrap gap-2">
                {user.skills &&
                  user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <Link to={`/profile/${user._id}`}>
              <button
                className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition inline-block"
              >
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
