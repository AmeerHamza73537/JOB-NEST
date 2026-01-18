import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Contact from "../Components/Contact";
import { Link } from 'react-router-dom'
export default function Job() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false)
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListings();
  }, [params.listingId]);

  return (
    <main className="min-h-screen bg-[#F8F9FB] py-10 px-4">
      {loading && <p className="text-center text-xl">Loading...</p>}
      {error && <p className="text-center text-xl">Something went wrong</p>}

      {listing && !loading && !error && (
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* ================= TOP JOB HEADER ================= */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <span className="inline-block mb-3 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
              Featured Position
            </span>

            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white text-xl font-bold">
                {listing.companyName?.[0] || "C"}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {listing.jobTitle}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span>{listing.company}</span>
                  <span>•</span>
                  <span>{listing.location}</span>
                  <span>•</span>
                  <span className="text-gray-500">
                    {listing.address}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-green-600">
                    {listing.workType}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-green-600">
                    ${listing.minSalary} - ${listing.maxSalary}
                  </span>
                </div>
              </div>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
                <Link 
                    to={`/apply/${listing._id}`}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium hover:bg-blue-700 transition inline-block">
                  Apply Now
                </Link>
            )}
              {contact && <Contact listing={listing} owner={listing.userRef} />}
            </div>
          </div>

          {/* ================= MAIN CONTENT ================= */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            
            {/* -------- LEFT SIDE -------- */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Description */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">
                  Job Description
                </h2>
                <p className="whitespace-pre-line text-gray-700">
                  {listing.description}
                </p>
              </div>

              {/* Qualifications */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">
                  Required Qualifications
                </h2>
                <p className="whitespace-pre-line text-gray-600">
                  {listing.qualifications}
                </p>
              </div>

              {/* Skills */}
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.skills?.split(",").map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
