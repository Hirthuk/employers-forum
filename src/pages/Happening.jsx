import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SinglePost from '../components/SinglePost';
import { assets } from '../assets';

const dummyPosts = [
  {
    SapId: "52006991",
    Name: "Arjun",
    message: "Great job on the recent project delivery!",
    fromSapId: "52006992"
  },
  {
    SapId: "52006992",
    Name: "Teja",
    message: "Thanks for your support during the release.",
    fromSapId: "52006993"
  },
  {
    SapId: "52006993",
    Name: "Priya",
    message: "Your documentation was very helpful.",
    fromSapId: "52006994"
  },
  {
    SapId: "52006994",
    Name: "Rahul",
    message: "Excellent teamwork and collaboration!",
    fromSapId: "52006995"
  },
  {
    SapId: "52006995",
    Name: "Sneha",
    message: "Appreciate your quick response to issues.",
    fromSapId: "52006996"
  },
  {
    SapId: "52006996",
    Name: "Vikram",
    message: "Your leadership inspired the team.",
    fromSapId: "52006997"
  },
  {
    SapId: "52006997",
    Name: "Divya",
    message: "Great presentation in the client meeting.",
    fromSapId: "52006998"
  },
  {
    SapId: "52006998",
    Name: "Kiran",
    message: "Thanks for mentoring the new joiners.",
    fromSapId: "52006999"
  },
  {
    SapId: "52006999",
    Name: "Meena",
    message: "Your code reviews are always insightful.",
    fromSapId: "52007000"
  },
  {
    SapId: "52007000",
    Name: "Ravi",
    message: "Appreciate your dedication and hard work.",
    fromSapId: "52006991"
  }
];

const Happening = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSearch, setShowSearch] = useState(true);

  const [filteredPosts, setFilteredPosts] = useState(dummyPosts);

  // Always filter from dummyPosts
  useEffect(() => {
    let posts = [...dummyPosts];
    if (activeFilter === 'recent') {
      posts = posts.reverse();
    }
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      posts = posts.filter(post =>
        post.Name.toLowerCase().includes(term) ||
        post.SapId.toString().includes(term) ||
        post.message.toLowerCase().includes(term)
      );
    }
    setFilteredPosts(posts);
  }, [searchTerm, activeFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  const handleFilter = (type) => {
    setActiveFilter(type);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50'>
      <NavBar />
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        {/* Search and Filter Section */}
        <div className={`${showSearch ? 'block' : 'hidden'} transition-all duration-300`}>
          <div className='flex flex-col md:flex-row gap-4 mb-8 sticky top-16 z-10 pt-4 pb-4 bg-transparent backdrop-blur-sm rounded-xl'>
            <div className='relative flex-grow'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <img 
                  src={assets.searchIcon} 
                  alt="Search" 
                  className='h-5 w-5 text-blue-500'
                />
              </div>
              <input
                type='text'
                placeholder='Search by name, SapID or message...'
                className='w-full px-4 py-3 pl-10 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition-all bg-white/80'
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className='absolute right-3 top-3 h-5 w-5 text-blue-500 hover:text-blue-700 focus:outline-none transition-colors'
                  aria-label='Clear search'
                >
                  <img src={assets.closeIcon} alt="Clear search" />
                </button>
              )}
            </div>
            
            <div className='flex gap-2'>
              <button 
                onClick={() => handleFilter('recent')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeFilter === 'recent' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white/80 border border-blue-200 hover:bg-blue-50 text-blue-600'
                }`}
              >
                Most Recent
              </button>
              <button 
                onClick={() => handleFilter('all')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white/80 border border-blue-200 hover:bg-blue-50 text-blue-600'
                }`}
              >
                All Posts
              </button>
            </div>
          </div>
        </div>

        {/* Floating search toggle button */}
        <button 
          onClick={() => setShowSearch(!showSearch)}
          className={`fixed md:hidden bottom-6 right-6 p-3 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all ${
            showSearch ? 'rotate-45' : ''
          }`}
          aria-label={showSearch ? 'Hide search' : 'Show search'}
        >
          <img 
            src={showSearch ? assets.closeIcon : assets.searchIcon} 
            alt="Toggle search" 
            className='h-6 w-6 text-white'
          />
        </button>

        {/* Posts Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPosts.map((post, idx) => (
            <SinglePost
              key={idx}
              SapId={post.SapId}
              Name={post.Name}
              message={post.message}
              fromSapId={post.fromSapId}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className='text-center py-16'>
            <div className='mx-auto bg-white p-8 rounded-2xl shadow-md max-w-md border border-blue-100'>
              <img 
                src={assets.emptyStateIcon} 
                alt="No posts found" 
                className='mx-auto h-20 w-20 text-blue-400 mb-4'
              />
              <h3 className='text-xl font-medium text-gray-800 mb-2'>No posts found</h3>
              <p className='text-gray-500 mb-6'>Try adjusting your search or filter</p>
              <button 
                onClick={clearSearch}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm'
              >
                Clear search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Happening;