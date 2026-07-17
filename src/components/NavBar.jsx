import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {
  SparklesIcon,
  HeartIcon,
  UserCircleIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const ICONS = {
  happenings: SparklesIcon,
  appreciate: HeartIcon,
  profile: UserCircleIcon,
  about: InformationCircleIcon,
};

const NavBar = () => {
  const {
    currentPage,
    setCurrentPage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    pages,
    navigator,
    logout,
  } = useContext(UserContext);

  const pagesWithAbout = Array.isArray(pages) && pages.some(p => p.id === 'about' || p.name?.toLowerCase() === 'about')
    ? pages
    : [...(pages || []), { id: 'about', name: 'About' }];

  const activeIndex = Math.max(0, pagesWithAbout.findIndex(p => p.id === currentPage));

  const handleLogout = async () => {
    await logout();
    navigator('/login');
  };

  const go = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    navigator(pageId === '/' ? '/' : `/${pageId}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <button onClick={() => go('happenings')} className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(217,70,239,0.7)] group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <span className="text-lg font-bold gradient-text tracking-tight">Rewards Sphere</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            {pagesWithAbout.map((page) => {
              const Icon = ICONS[page.id];
              const active = currentPage === page.id;
              return (
                <button
                  key={page.id}
                  onClick={() => go(page.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-white/10 text-white shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? 'text-fuchsia-400' : ''}`} />}
                  {page.name}
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="ml-3 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-black/70 backdrop-blur-xl border-t border-white/10`}>
        <div className="pt-2 pb-4 space-y-1 px-4">
          {pagesWithAbout.map((page) => {
            const Icon = ICONS[page.id];
            const active = currentPage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => go(page.id)}
                className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  active ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {page.name}
              </button>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-base font-medium text-rose-300 hover:bg-rose-500/10 transition-all"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Active Page Indicator */}
      <div className="hidden sm:block h-[3px] bg-white/5 relative overflow-hidden">
        <div
          className="absolute inset-y-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${100 / pagesWithAbout.length}%`,
            left: `${(activeIndex / pagesWithAbout.length) * 100}%`,
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
