import React from 'react'
import NavBar from '../components/NavBar'
import SinglePost from '../components/SinglePost'
import { useState } from 'react';
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
  const [filteredPosts, setFilteredPosts] = useState(dummyPosts);
  const [showSearch, setShowSearch] = useState(true);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = dummyPosts.filter(post => 
      post.Name.toLowerCase().includes(term) || 
      post.SapId.includes(term) ||
      post.message.toLowerCase().includes(term)
    );
    setFilteredPosts(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredPosts(dummyPosts);
  };

  const handleFilter = (type) => {
    if (type === 'recent') {
      setFilteredPosts([...dummyPosts].reverse());
    } else {
      setFilteredPosts(dummyPosts);
    }
  };

  return (
    <div className='min-h-screen'>
      <NavBar />
      
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* Search and Filter Section */}
        {showSearch && (
          <div className='flex flex-col md:flex-row gap-4 mb-8 sticky top-0 z-10 pt-4 pb-4'>
            <div className='relative flex-grow'>
              <input
                type='text'
                placeholder='Search by name or SapId'
                className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
                value={searchTerm}
                onChange={handleSearch}
              />
              
              {/* Search Icon - Always visible */}
              <img 
                src={assets.searchIcon} 
                alt="Search" 
                className='absolute left-3 top-2.5 h-5 w-5 text-gray-400'
              />
              
              {/* Clear (X) Icon - Only visible when there's text */}
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className='absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600 focus:outline-none'
                  aria-label='Clear search'
                >
                  <img 
                    src={assets.closeIcon} 
                    alt="Clear search" 
                  />
                </button>
              )}
            </div>
            
            <div className='flex gap-2'>
              <button 
                onClick={() => handleFilter('recent')}
                className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'
              >
                Most Recent
              </button>
              <button 
                onClick={() => handleFilter('all')}
                className='px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'
              >
                All Posts
              </button>
            </div>
          </div>
        )}

        {/* Toggle search visibility button - shown when search is hidden */}
        {!showSearch && (
          <button 
            onClick={() => setShowSearch(true)}
            className='mb-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors'
            aria-label='Show search'
          >
            <img 
              src={assets.searchIcon} 
              alt="Show search" 
              className='h-5 w-5 text-gray-400'
            />
          </button>
        )}

        {/* Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
          <div className='text-center py-12'>
            <img 
              src={assets.emptyStateIcon} 
              alt="No posts found" 
              className='mx-auto h-24 w-24 text-gray-400 mb-4'
            />
            <h3 className='text-lg font-medium text-gray-900'>No posts found</h3>
            <p className='text-gray-500 mt-1'>Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Happening;

