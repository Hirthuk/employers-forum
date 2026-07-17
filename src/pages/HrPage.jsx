import React from 'react';
import NavBar from '../components/NavBar';
import {
  HeartIcon,
  MegaphoneIcon,
  RectangleGroupIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const Feature = (props) => {
  const { title, desc, Icon } = props;
  return (
    <div className="glass-panel rounded-xl p-5 hover:border-white/20 transition-all">
      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-fuchsia-500/10 text-fuchsia-300 mb-4">
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-400">{desc}</p>
    </div>
  );
};

const HrPage = () => {
  return (
    <>
      <NavBar />

      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl grid gap-8 md:grid-cols-2 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <span className="chip bg-white/5 border-white/10 text-slate-300">About the platform</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Ripple — <span className="gradient-text">Appreciate. Connect. Grow.</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-prose">
              Ripple is an internal platform for employees to appreciate peers, share wins,
              and coordinate across projects. Built with clear role-based controls and lightweight
              workflows so teams can celebrate contributions and keep an auditable record of recognition.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Feature
                title="Peer Appreciation"
                desc="Quickly recognize teammates with messages and badges that contribute to team morale."
                Icon={HeartIcon}
              />
              <Feature
                title="Announcements"
                desc="Broadcast important updates and achievements to the right people and projects."
                Icon={MegaphoneIcon}
              />
              <Feature
                title="Project Hubs"
                desc="Group recognition and discussions by project to keep context and impact clear."
                Icon={RectangleGroupIcon}
              />
              <Feature
                title="Admin Controls"
                desc="Role-aware approvals and simple user management for HR and managers."
                Icon={ShieldCheckIcon}
              />
            </div>
          </div>

          {/* Right: Summary card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-6 glass-panel rounded-2xl relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl" />
              <div className="relative flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_-6px_rgba(217,70,239,0.7)]">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white text-center relative">Ripple — Celebrate wins</h3>
              <p className="text-sm text-slate-400 mt-2 text-center relative">
                Fast appreciation flows, clear project context, and lightweight admin tools.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-slate-300 relative">
                <li className="flex items-start gap-2">
                  <span className="inline-block mt-1.5 w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-cyan-300 rounded-full" />
                  Peer-to-peer recognition
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block mt-1.5 w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-cyan-300 rounded-full" />
                  Role-based approvals & audit trails
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block mt-1.5 w-1.5 h-1.5 bg-gradient-to-r from-violet-400 to-cyan-300 rounded-full" />
                  Project-centric feeds
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HrPage;
