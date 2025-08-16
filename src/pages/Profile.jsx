import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { ProfileService, userProfile, setUserProfile, token, AdminCheck, isAdmin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await ProfileService.getProfileDetails();
        setUserProfile(profile.data);
        AdminCheck(token);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [ProfileService, setUserProfile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center px-4 py-6">
      <NavBar />

      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl mt-8 p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">

        {/* Abstract background elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-100/50 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-indigo-100/50 blur-xl"></div>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Avatar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-75 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-md animate-tilt"></div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0"></div>
              <span className="relative z-10">{userProfile.name?.charAt(0) ?? ""}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              {userProfile.name ?? ""}
            </h2>
            <p className="text-indigo-600 font-medium mt-1">{userProfile.designation ?? ""}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs sm:text-sm rounded-full font-medium">
                SAP ID: {userProfile.sapid ?? ""}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs sm:text-sm rounded-full font-medium">
                {userProfile.contact ?? ""}
              </span>
            </div>
          </div>

          {/* Admin Page button (responsive) - visible only for admins */}
          {isAdmin ? 
            <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                aria-label="Go to Admin Page"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v3h-6v-3zM6 7h.01M6 11h.01M6 15h.01M3 21h18" />
                </svg>
                <span className="text-sm sm:text-base">Admin Page</span>
              </button>
            </div> : ""
          }
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 relative z-10">
          <StatCard title="Current Project" value={userProfile.project} color="green" iconPath="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <StatCard title="Total Appreciation" value={userProfile.total_appreciation} color="blue" iconPath="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          <StatCard title="Performer Rank" value={`#${userProfile.rank}`} color="purple" iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </div>

        {/* Points Card */}
        <div className="relative z-10 mt-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/0"></div>
            <div className="relative flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h3 className="text-white/90 text-sm font-medium">Points Earned</h3>
                <p className="text-3xl sm:text-4xl font-bold text-white mt-1">
                  {userProfile.points?.toLocaleString() ?? 0} pts
                </p>
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

      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, iconPath }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
    <div className={`absolute inset-0 bg-gradient-to-br from-${color}-50 to-${color}-100 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
    <div className="relative">
      <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center mb-3`}>
        <svg className={`w-6 h-6 text-${color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
        </svg>
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-xl font-bold text-gray-800 mt-1">{value ?? "-"}</p>
    </div>
  </div>
);

export default Profile;
