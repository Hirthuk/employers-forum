import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { UserContext } from '../context/UserContext';
import {
  BriefcaseIcon,
  HeartIcon,
  TrophyIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const COLOR_STYLES = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400' },
};

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
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [ProfileService, setUserProfile]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center h-96">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400"></div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="flex items-center justify-center h-96">
          <p className="text-rose-300">No profile data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6">
      <NavBar />

      <div className="w-full max-w-4xl glass-panel rounded-3xl mt-8 p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl" />

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 rounded-full opacity-70 blur-sm"></div>
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg border-4 border-black/40 overflow-hidden">
              <span className="relative z-10">{userProfile.name?.charAt(0) ?? ''}</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              {userProfile.name ?? ''}
            </h2>
            <p className="text-cyan-300 font-medium mt-1">{userProfile.designation ?? ''}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              <span className="chip bg-violet-500/10 text-violet-300 border-violet-500/20">
                SAP ID: {userProfile.sapid ?? ''}
              </span>
              <span className="chip bg-white/5 text-slate-300 border-white/10">
                {userProfile.project_name ?? ''}
              </span>
            </div>
          </div>

          {isAdmin ? (
            <div className="w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 flex justify-center sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                aria-label="Go to Admin Page"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                <span className="text-sm sm:text-base">Admin Page</span>
              </button>
            </div>
          ) : null}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 relative z-10">
          <StatCard title="Current Project" value={userProfile.project_name} color="emerald" Icon={BriefcaseIcon} />
          <StatCard title="Total Appreciation" value={userProfile.total_appreciation} color="cyan" Icon={HeartIcon} />
          <StatCard title="Performer Rank" value={userProfile.rank ? `#${userProfile.rank}` : '-'} color="violet" Icon={TrophyIcon} />
        </div>

        {/* Points Card */}
        <div className="relative z-10 mt-4">
          <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 rounded-2xl p-6 shadow-lg overflow-hidden">
            <div className="relative flex flex-col sm:flex-row items-center justify-between">
              <div>
                <h3 className="text-white/80 text-sm font-medium">Points Earned</h3>
                <p className="text-3xl sm:text-4xl font-bold text-white mt-1">
                  {(userProfile.total_appreciation ?? 0) * 10} pts
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center">
                  <SparklesIcon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = (props) => {
  const { title, value, color, Icon } = props;
  const style = COLOR_STYLES[color] ?? COLOR_STYLES.violet;
  return (
    <div className="glass-panel rounded-2xl p-5 hover:border-white/20 transition-all">
      <div className={`w-12 h-12 rounded-lg ${style.bg} flex items-center justify-center mb-3`}>
        <Icon className={`w-6 h-6 ${style.text}`} />
      </div>
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <p className="text-xl font-bold text-white mt-1">{value ?? '-'}</p>
    </div>
  );
};

export default Profile;
