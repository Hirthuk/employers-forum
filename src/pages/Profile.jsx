import React from 'react';
import NavBar from '../components/NavBar';
import { UserContext } from '../context/UserContext';

const Profile = () => {

  const user = {
    name: "Teja",
    sapId: "52006992",
    contact: "+91 9876543210",
    designation: "Software Engineer",
    project: "Insight Hub",
    totalAppreciation: 42,
    performerRank: 3,
    points: 8400,
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center px-4 py-6">
      <NavBar />

      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl mt-8 p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100/50 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-100/50 blur-xl"></div>
        
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Avatar with animated gradient border */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-md animate-tilt"></div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0"></div>
              <span className="relative z-10">{user.name.charAt(0)}</span>
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              {user.name}
            </h2>
            <p className="text-indigo-600 font-medium mt-1">{user.designation}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs sm:text-sm rounded-full font-medium">
                SAP ID: {user.sapId}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs sm:text-sm rounded-full font-medium">
                {user.contact}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 relative z-10">
          {/* Project Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Current Project</h3>
              <p className="text-xl font-bold text-gray-800 mt-1">{user.project}</p>
            </div>
          </div>
          
          {/* Appreciation Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Total Appreciation</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1">{user.totalAppreciation}</p>
            </div>
          </div>
          
          {/* Rank Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-500">Performer Rank</h3>
              <p className="text-3xl font-bold text-gray-800 mt-1">#{user.performerRank}</p>
            </div>
          </div>
        </div>

        {/* Points Card */}
        <div className="relative z-10 mt-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0"></div>
            <div className="relative flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h3 className="text-white/90 text-sm font-medium">Points Earned</h3>
                <p className="text-3xl sm:text-4xl font-bold text-white mt-1">{user.points.toLocaleString()} pts</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="relative z-10 mt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Top Performer</h4>
                  <p className="text-sm text-gray-500">Ranked #{user.performerRank} this month</p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Consistent Achiever</h4>
                  <p className="text-sm text-gray-500">5+ appreciations for 3 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;