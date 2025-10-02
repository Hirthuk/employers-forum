import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { assets } from '../assets';
import { API_CONFIG, axiosApiClient } from '../config/config';
import AuthService from '../services/AuthService';

const Happening = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'recent' | 'me'
  const [showSearch, setShowSearch] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likingPostId, setLikingPostId] = useState(null);

  // current logged in user's SAP ID (string)
  const mySapId = (AuthService.getSapId && AuthService.getSapId())?.toString() || null;

  // Fetch data from API
  useEffect(() => {
    const getHappenings = async () => {
      try {
        setLoading(true);
        const response = await axiosApiClient.get(API_CONFIG.EndPoints.GETHAPPENINGS);

        // Transform API data to match expected format
        const transformedPosts = (response?.data || []).map(post => ({
          id: post.id,
          SapId: (post.to_sapid ?? post.toSapId ?? post.toSapid ?? '').toString(),
          Name: (post.getterName ?? post.name ?? '').toString(),
          message: post.appreciation_message ?? post.message ?? '',
          fromSapId: (post.from_sapid ?? post.fromSapId ?? '').toString(),
          likes: Number(post.likes ?? 0),
          creation_date: post.creation_date ?? post.createdAt ?? post.creationDate,
          liked: false, // placeholder
          appreciation_header: post.appreciation_header ?? post.header ?? post.title ?? ''
        }));

        setPosts(transformedPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching happenings:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getHappenings();
  }, []);

  // Handle like button click
  const handleLikeClick = async (postId, currentLikes) => {
    try {
      setLikingPostId(postId);

      // Optimistically update the UI
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, likes: currentLikes + 1, liked: true }
            : post
        )
      );

      // Make API call to update likes
      await axiosApiClient.post(
        `/api/appreciate/like/${postId}`,
        null,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error('Error liking post:', err);

      // Revert optimistic update on error
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, likes: currentLikes, liked: false }
            : post
        )
      );

      alert('Failed to like the post. Please try again.');
    } finally {
      setLikingPostId(null);
    }
  };

  // Filter posts based on search and filter criteria
  const filteredPosts = React.useMemo(() => {
    let result = [...posts];

    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(post =>
        (post.Name || '').toLowerCase().includes(term) ||
        (post.SapId || '').toString().includes(term) ||
        (post.message || '').toLowerCase().includes(term)
      );
    }

    // Apply 'me' filter (received by current user)
    if (activeFilter === 'me' && mySapId) {
      result = result.filter(post => (post.SapId || '').toString() === mySapId.toString());
    }

    // Apply sorting filter
    if (activeFilter === 'recent') {
      result = result.reverse();
    }

    return result;
  }, [posts, searchTerm, activeFilter, mySapId]);

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

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50'>
        <NavBar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 flex justify-center items-center h-64'>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50'>
        <NavBar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 flex justify-center items-center h-64'>
          <div className="text-center bg-white p-8 rounded-2xl shadow-md max-w-md border border-blue-100">
            <img 
              src={assets.errorIcon || assets.emptyStateIcon} 
              alt="Error" 
              className='mx-auto h-20 w-20 text-red-400 mb-4'
            />
            <h3 className='text-xl font-medium text-gray-800 mb-2'>Something went wrong</h3>
            <p className='text-gray-500 mb-6'>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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

              {/* New 'Me' filter - shows posts received by current user */}
              <button 
                onClick={() => handleFilter('me')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeFilter === 'me' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white/80 border border-blue-200 hover:bg-blue-50 text-blue-600'
                }`}
                title={mySapId ? `Show posts received by ${mySapId}` : 'Show posts received by me'}
              >
                Me
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
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              SapId={post.SapId}
              Name={post.Name}
              message={post.message}
              fromSapId={post.fromSapId}
              likes={post.likes}
              creation_date={post.creation_date}
              liked={post.liked}
              appreciation_header={post.appreciation_header}
              onLike={() => handleLikeClick(post.id, post.likes)}
              isLiking={likingPostId === post.id}
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
              <h3 className='text-xl font-medium text-gray-800 mb-2'>
                {posts.length === 0 ? 'No posts yet' : 'No posts found'}
              </h3>
              <p className='text-gray-500 mb-6'>
                {posts.length === 0 
                  ? 'Be the first to share an appreciation!' 
                  : 'Try adjusting your search or filter'}
              </p>
              <button 
                onClick={clearSearch}
                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm'
              >
                {posts.length === 0 ? 'Refresh' : 'Clear search'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Happening;