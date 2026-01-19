import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProfileCard from '../Components/ProfileCard.jsx'

export default function SearchTalent() {
  
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([])
  const [noResult, setNoResult] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser)

  const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/user/search/${currentUser?._id || ''}?name=${encodeURIComponent(searchTerm)}`);
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
        setNoResult(data.length === 0);
      } catch (error) {
        console.error(error);
        setUsers([]);
        setNoResult(true);
      }
      setLoading(false);
    };

  useEffect(() => {    
    fetchUsers();
  }, [currentUser]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    fetchUsers()
  }
  
  return (
    <>
      <div className="bg-[#F8F9FB]">
        <div className="px-10 py-9">
            <h1 className="text-4xl font-bold">
              Find Your Perfect <span className="text-[#3f7fb0]">Talent</span>
            </h1>
            <p className="text-slate-500">
              Discover Hidden Talents that will be best for your projects.
            </p>
          </div>
          <div className="p-3 m-8 bg-white rounded-lg">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search by user name"
                  onChange={handleChange}
                  value={searchTerm}
                  className="bg-slate-100 p-2 rounded-lg w-full"
                />
                <button className="px-7 bg-gradient-to-r from-[#5fa2d8] to-[#3f7fb0] text-white py-3 rounded-lg font-semibold hover:font-bold hover:shadow-xl hover:cursor-pointer transition">
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center">
            {loading && <p>Loading...</p>}
            {!loading && users.map((user) => (
              <ProfileCard key={user._id} user={user} />
            ))}
            {noResult && !loading && "No users found regarding this search"}
          </div>
      </div>
    </>
  )
}
