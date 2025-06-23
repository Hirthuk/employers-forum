import React from 'react';
import NavBar from '../components/NavBar';

const Profile = () => {
  const user = {
    name: "Teja",
    sapId: "52006992",
    contact: "+91 9876543210",
    designation: "Software Engineer",
    project: "Insight Hub",
    totalAppreciation: 42,
    performerRank: 3,
    amountEarned: 8400,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center px-4 py-6">
      <NavBar />

      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl mt-10 p-6 sm:p-8 flex flex-col gap-6">
        {/* Profile Picture & Basic Info */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-md mb-2">
            {user.name[0]}
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm sm:text-base">SAP ID: <span className="font-medium">{user.sapId}</span></p>
          <p className="text-gray-500 text-sm sm:text-base">Contact: <span className="font-medium">{user.contact}</span></p>
        </div>

        {/* Designation and Project */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-blue-100 rounded-xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-sm sm:text-base text-gray-600">Designation</span>
            <span className="text-lg sm:text-xl font-semibold text-blue-700 mt-1">{user.designation}</span>
          </div>
          <div className="flex-1 bg-green-100 rounded-xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-sm sm:text-base text-gray-600">Project</span>
            <span className="text-lg sm:text-xl font-semibold text-green-700 mt-1">{user.project}</span>
          </div>
        </div>

        {/* Appreciation and Rank */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-blue-50 rounded-xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-sm sm:text-base text-gray-600">Total Appreciation</span>
            <span className="text-2xl sm:text-3xl font-bold text-blue-700 mt-2">{user.totalAppreciation}</span>
          </div>
          <div className="flex-1 bg-purple-50 rounded-xl p-4 flex flex-col items-center shadow-sm">
            <span className="text-sm sm:text-base text-gray-600">Performer Rank</span>
            <span className="text-2xl sm:text-3xl font-bold text-purple-700 mt-2">#{user.performerRank}</span>
          </div>
        </div>

        {/* Amount Earned */}
        <div className="flex flex-col items-center bg-yellow-50 rounded-xl p-5 shadow-sm mt-2">
          <span className="text-sm sm:text-base text-gray-600 text-center">Amount Earned Through Appreciation</span>
          <span className="text-xl sm:text-2xl font-bold text-yellow-600 mt-2">₹{user.amountEarned.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
