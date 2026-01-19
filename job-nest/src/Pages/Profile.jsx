import React from "react";
import {
  FaUserCircle,
  FaPlus,
  FaEdit,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LogOutIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {
  signoutStart,
  signoutSuccess,
  signoutFailure,
} from "../redux/user/UserSlice.js";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/sign-out", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        signoutFailure(data.message);
        return;
      }
      dispatch(signoutSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signoutFailure(error.message));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (params.userId && params.userId !== currentUser?._id) {
        try {
          setLoading(true);
          const res = await fetch(`/api/user/${params.userId}`, {
            credentials: "include",
          });
          const data = await res.json();
          if (data.success === false) {
            setError(true);
            setLoading(false);
            return;
          }
          setUser(data);
          setLoading(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      } else {
        setUser(currentUser);
      }
    };
    fetchUser();
  }, [params.userId, currentUser]);

  const displayUser = user || currentUser;

  console.log(displayUser);

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
                {displayUser?.name}
              </h1>
              <p className="text-blue-100 text-lg">{displayUser?.title}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm opacity-90">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt />
                  {displayUser?.location}
                </span>
                <span className="bg-green-500 px-3 py-0.5 rounded-full text-xs font-bold">
                  Online
                </span>
              </div>
            </div>

            {/* Header Actions */}
            {params.userId && params.userId !== currentUser?._id ? (
              ""
            ) : (
              <div className="flex gap-3">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-xl flex items-center gap-2 transition">
                  <Link
                    to="/update-profile"
                    className="flex items-center gap-2"
                  >
                    <FaEdit /> Edit Profile
                  </Link>
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-red-700 hover:bg-red-600 backdrop-blur-md text-white px-5 py-2 rounded-xl flex items-center gap-2 transition"
                >
                  <LogOutIcon /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Column 1: About & Skills */}
          <div className="space-y-6">
            <Card title="About Me">
              <p className="text-gray-600 text-sm leading-relaxed">
                {displayUser?.bio ? (
                  displayUser.bio
                ) : params.userId ? (
                  "No bio available"
                ) : (
                  <Link to="/update-profile">+Add Bio</Link>
                )}
              </p>
              <div className="mt-6">
                <h4 className="font-bold mb-3 text-gray-800">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {displayUser?.skills &&
                    displayUser.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </div>
            </Card>

            <Card title="Work Experience" hasAdd>
              {displayUser?.workExperience &&
                displayUser.workExperience.map((exp, index) => (
                  <ExperienceItem
                    key={index}
                    company={exp.company}
                    role={exp.role}
                    date={exp.period}
                  />
                ))}
            </Card>
          </div>

          {/* Column 2: Education & Projects */}
          <div className="space-y-6">
            <Card title="Education" hasAdd>
              {displayUser?.education &&
                displayUser.education.map((edu, index) => (
                  <ExperienceItem
                    key={index}
                    company={edu.institute}
                    role={edu.degree}
                    date={edu.period}
                  />
                ))}
            </Card>
            <Card title="Contact Details">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <HiOutlineMail className="text-blue-600" />{" "}
                  {displayUser?.email}
                </div>
                <div className="flex items-center gap-3">
                  <FaLinkedin className="text-blue-600" />{" "}
                  {displayUser?.linkedin}
                </div>
                <div className="flex items-center gap-3">
                  <FaGithub className="text-gray-900" />
                  {displayUser?.github}
                </div>
              </div>
            </Card>
          </div>

          {/* Column 3: Sidebar Actions */}
          {params.userId && params.userId !== currentUser?._id ? (
            ""
          ) : (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">
                  Looking to hire talent?
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  List a job and connect with thousands of qualified
                  professionals.
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition mb-3">
                  <Link to="/create-job">
                    <div className="flex gap-2 items-center">
                      <div className="">
                        <FaPlus />
                      </div>
                      <div className="">Post a Job</div>
                    </div>
                  </Link>
                </button>
              </div>
            </div>
          )}
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
    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-tighter">
      {label}
    </div>
  </div>
);

const Card = ({ title, children, hasAdd = false }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800 text-lg tracking-tight">
        {title}
      </h3>
      {hasAdd && (
        <FaPlus className="text-gray-400 cursor-pointer hover:text-blue-600" />
      )}
    </div>
    {children}
  </div>
);

const ExperienceItem = ({ company, role, date }) => (
  <div className="flex items-start gap-4 mb-6 last:mb-0">
    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 font-bold">
      {company ? company[0].toUpperCase() : ""}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 leading-none">{company}</h4>
      <p className="text-sm text-blue-600 font-medium my-1">{role}</p>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
  </div>
);

export default Profile;
