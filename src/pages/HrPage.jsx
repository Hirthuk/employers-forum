import React from 'react';
import NavBar from '../components/NavBar';

const Feature = ({ title, desc, children }) => (
  <div className="bg-white/90 dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="w-12 h-12 flex items-center justify-center rounded-md bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-300 mb-4">
      {children}
    </div>
    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h4>
    <p className="text-xs text-gray-600 dark:text-gray-300">{desc}</p>
  </div>
);

const HrPage = () => {
  return (
    <>
      <NavBar />

      <section className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 mt-2 rounded-xl">
        <div className="w-full max-w-6xl grid gap-8 md:grid-cols-2 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              InsiderHub — Appreciate. Connect. Grow.
            </h1>

            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base max-w-prose">
              InsiderHub is an internal platform for employees to appreciate peers, share wins,
              and coordinate across projects. Built with clear role-based controls and lightweight
              workflows so teams can celebrate contributions and keep an auditable record of recognition.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Feature
                title="Peer Appreciation"
                desc="Quickly recognize teammates with messages and badges that contribute to team morale."
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 9l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </Feature>

              <Feature
                title="Announcements"
                desc="Broadcast important updates and achievements to the right people and projects."
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0122 9.618V14a2 2 0 01-1.447 1.895L15 18v-8zM8 8v8" />
                </svg>
              </Feature>

              <Feature
                title="Project Hubs"
                desc="Group recognition and discussions by project to keep context and impact clear."
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </Feature>

              <Feature
                title="Admin Controls"
                desc="Role-aware approvals and simple user management for HR and managers."
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3v3h-6v-3z" />
                </svg>
              </Feature>
            </div>
          </div>

          {/* Right: Illustration / summary card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-white/95 dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-36 h-36 text-teal-500" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.12" />
                  <path d="M16 28h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="24" cy="36" r="3" fill="currentColor" />
                  <circle cx="32" cy="36" r="3" fill="currentColor" />
                  <circle cx="40" cy="36" r="3" fill="currentColor" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">InsiderHub — Celebrate wins</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                Fast appreciation flows, clear project context, and lightweight admin tools.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="inline-block mt-1 w-2 h-2 bg-teal-600 rounded-full" />
                  Peer-to-peer recognition
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block mt-1 w-2 h-2 bg-teal-600 rounded-full" />
                  Role-based approvals & audit trails
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block mt-1 w-2 h-2 bg-teal-600 rounded-full" />
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
