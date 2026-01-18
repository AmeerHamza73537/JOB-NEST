import React, { useEffect, useState } from "react";
import JobCard from "../Components/JobCard.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SearchJobs() {
  const navigate = useNavigate();
  const [showmore, setShowmore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchData, setsearchData] = useState({
    searchTerm: "",
    sort: "createdAt",
    order: "desc",
  });
  const [noResult, setNoResult] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const fetchListings = async (
    searchTerm = "",
    sort = "createdAt",
    order = "desc",
    startIndex = 0,
  ) => {
    setLoading(true);
    setShowmore(false);
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("sort", sort);
    urlParams.set("order", order);
    if (startIndex > 0) urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length > 9) {
      setShowmore(true);
    } else {
      setShowmore(false);
    }
    if (data.length === 0) {
      setNoResult(true);
    }
    setListings(startIndex > 0 ? [...listings, ...data] : data);
    setLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (searchTermFromUrl || sortFromUrl || orderFromUrl) {
      setsearchData({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }
    fetchListings(
      searchTermFromUrl || "",
      sortFromUrl || "createdAt",
      orderFromUrl || "desc",
    );
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setsearchData({
        ...searchData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setsearchData({ ...searchData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchListings(searchData.searchTerm, searchData.sort, searchData.order);
  };

  const onshowMoreClick = async () => {
    const numberofListings = listings.length;
    const startIndex = numberofListings;
    fetchListings(
      searchData.searchTerm,
      searchData.sort,
      searchData.order,
      startIndex,
    );
  };

  return (
    <>
      {currentUser ? (
        <div className="bg-[#F8F9FB]">
          <div className="px-10 py-9">
            <h1 className="text-4xl font-bold">
              Find Your Next <span className="text-[#3f7fb0]">Opportunity</span>
            </h1>
            <p className="text-slate-500">
              Discover jobs and projects from companies and clients.
            </p>
          </div>
          <div className="p-3 m-8 bg-white rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search Job Title, Keywords etc"
                  onChange={handleChange}
                  className="bg-slate-100 p-2 rounded-lg w-full"
                  value={searchData.searchTerm}
                />
                <button className="px-7 bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] text-white py-3 rounded-lg font-semibold hover:font-bold hover:shadow-xl hover:cursor-pointer transition">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center">
            {!loading &&
              listings.map((listing) => (
                <JobCard key={listing._id} listing={listing} />
              ))}
            {noResult ? "No Job exist regarding this search" : ""}
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="bg-white p-12 rounded-xl shadow-lg max-w-lg text-center">
            <p className="text-3xl md:text-4xl font-semibold text-gray-800">
              Sign In to Start Applying for Jobs
            </p>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
              <Link to={'/sign-in'}
                className=""
              >
                Sign In
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
