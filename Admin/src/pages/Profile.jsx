import { useSelector } from "react-redux";
import { useState } from "react";
import { FaUser, FaEnvelope, FaBirthdayCake, FaCalendar, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const admin = useSelector((state) => state.admin);

  // Hardcoded profile data
  const [profile] = useState({
    name: "Admin User",
    email: "admin@shipfloww.com",
    age: 28,
    joinDate: "2025-11-23",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1428] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">View and manage your admin account information</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 mb-8 border border-white/10">
          {/* Avatar and Name Section */}
          <div className="flex items-center gap-8 mb-8 pb-8 border-b border-white/10">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E9EB77] to-[#D9D964] flex items-center justify-center flex-shrink-0 shadow-xl">
              <FaUser className="text-5xl text-[#0a0e27]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{profile.name}</h2>
              <p className="text-[#E9EB77] text-lg mb-4">Administrator</p>
              <div className="flex items-center gap-4">
                <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-300 text-sm font-medium border border-green-500/30">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Email Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-white/10 hover:border-[#E9EB77]/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <FaEnvelope className="text-blue-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Email Address</p>
                <p className="text-white font-semibold">{profile.email}</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs">Email is permanently fixed and cannot be changed</p>
          </div>

          {/* Age Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-white/10 hover:border-[#E9EB77]/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <FaBirthdayCake className="text-purple-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Age</p>
                <p className="text-white font-semibold">{profile.age} years old</p>
              </div>
            </div>
          </div>

          {/* Join Date Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-white/10 hover:border-[#E9EB77]/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <FaCalendar className="text-green-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Member Since</p>
                <p className="text-white font-semibold">{new Date(profile.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Account Type Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 border border-white/10 hover:border-[#E9EB77]/30 transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <FaCog className="text-orange-400 text-xl" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium">Account Type</p>
                <p className="text-white font-semibold">Super Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FaCog className="text-[#E9EB77]" />
            Account Settings
          </h3>
          <p className="text-gray-400 mb-6">To edit your name and age, please visit the Settings page.</p>
          <Link to="/settings">
            <button className="bg-gradient-to-r from-[#E9EB77] to-[#D9D964] hover:shadow-lg text-[#0a0e27] font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
              Go to Settings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
