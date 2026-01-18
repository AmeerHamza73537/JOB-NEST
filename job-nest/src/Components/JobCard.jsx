import React from "react";
import { Bookmark } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const JobCard = ({ listing }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-full max-w-5xl rounded-xl border border-gray-200 bg-white p-6 my-3 shadow-sm hover:shadow-md transition">
      <Link to={`/listing/${listing._id}`}>
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-start gap-4">
            {/* Company logo */}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
              {listing.company.charAt(0)}
            </div>

            {/* Job info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {listing.jobTitle}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>{listing.company}</span>
                <span>•</span>
                <span>{listing.address}</span>
                <span>•</span>
                <span className="font-medium text-gray-700">
                  ${listing.minSalary} - ${listing.maxSalary}
                </span>
                <span>•</span>
                <span>Posted on {listing.createdAt.slice(0, 10)}</span>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                  {listing.workType}
                </span>
                {listing.skills &&
                  listing.skills
                    .split(", ")
                    .filter((skill) => skill.trim())
                    .map((skill) => (
                      <span
                        key={skill.trim()}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        {skill.trim()}
                      </span>
                    ))}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {currentUser && listing.userRef !== currentUser._id && (
              <button
                className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition inline-block"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
