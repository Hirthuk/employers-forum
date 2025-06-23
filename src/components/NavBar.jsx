import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const NavBar = () => {
 const {currentPage,
    setCurrentPage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    pages,
    navigator,
  } = useContext(UserContext)

  return (
    <div className='bg-blue-50 shadow-lg rounded-3xl mb-4 mx-2 sm:mx-4 md:mx-6 mt-10'>
      {/* Mobile Menu Button (only visible on small screens) */}
      <div className='sm:hidden flex justify-between items-center p-4'>
        <h1 className='text-xl font-bold'>Insight Hub</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='p-2 rounded-md focus:outline-none'
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation - Desktop */}
      <div className='hidden sm:flex flex-row justify-between items-center text-center px-6 py-4'>
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => {
              setCurrentPage(page.id);
              if (page.id === "/") {
                navigator("/");
              } else {
                navigator(`/${page.id}`);
              }
            }}
            className={`px-4 py-2 rounded-full text-sm md:text-base lg:text-lg font-medium transition-all duration-200 ${
              currentPage === page.id 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {page.name}
          </button>
        ))}
      </div>

      {/* Mobile Menu (only visible when toggled) */}
      {isMobileMenuOpen && (
        <div className='sm:hidden flex flex-col space-y-2 p-4'>
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                setCurrentPage(page.id);
                setIsMobileMenuOpen(false);
                if (page.id === "/") {
                  navigator("/");
                } else {
                  navigator(`/${page.id}`);
                }
              }}
              className={`px-4 py-3 rounded-lg text-left font-medium ${
                currentPage === page.id 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-blue-50'
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>
      )}

      {/* Active Page Indicator (example) */}
      <div className='hidden sm:block px-6 pb-2'>
        <div className={`h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ${
          currentPage === "home" ? 'w-1/4' :
          currentPage === "happenings" ? 'w-2/4 ml-1/4' :
          currentPage === "appreciate" ? 'w-3/4 ml-1/4' :
          'w-full'
        }`}></div>
      </div>
    </div>
  )
}

export default NavBar
