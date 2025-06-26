import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const {
    currentPage,
    setCurrentPage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    pages,
    navigator,
    setId
  } = useContext(UserContext);

  const handleLogout = () => {
    setId('');
    localStorage.removeItem('id');
    navigator('/login');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                About
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => {
                  setCurrentPage(page.id);
                  navigator(page.id === "/" ? "/" : `/${page.id}`);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page.id
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-semibold shadow-inner'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                {page.name}
              </button>
            ))}
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-all"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden bg-white/95 backdrop-blur-sm`}>
        <div className="pt-2 pb-4 space-y-1 px-4">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                setCurrentPage(page.id);
                setIsMobileMenuOpen(false);
                navigator(page.id === "/" ? "/" : `/${page.id}`);
              }}
              className={`block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all ${
                currentPage === page.id
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
              }`}
            >
              {page.name}
            </button>
          ))}
          
          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50/50 transition-all flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Active Page Indicator */}
      <div className="hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-start">
              <div 
                className={`h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out ${
                  currentPage === "home" ? 'w-1/6' :
                  currentPage === "happenings" ? 'w-2/6' :
                  currentPage === "appreciate" ? 'w-3/6' :
                  'w-full'
                }`}
                style={{ boxShadow: '0 2px 8px -1px rgba(59, 130, 246, 0.4)' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;