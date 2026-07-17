import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import { assets } from '../assets';
import PostsService from '../services/PostsService';
import AuthService from '../services/AuthService';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const Happening = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'recent' | 'me'
  const [showSearch, setShowSearch] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likingPostId, setLikingPostId] = useState(null);

  const mySapId = (AuthService.getSapId && AuthService.getSapId())?.toString() || null;

  useEffect(() => {
    const getHappenings = async () => {
      try {
        setLoading(true);
        const data = await PostsService.getPosts();

        const transformedPosts = (data || []).map(post => ({
          id: post.id,
          SapId: (post.to_sapid ?? '').toString(),
          Name: (post.getterName ?? '').toString(),
          message: post.appreciation_message ?? '',
          fromSapId: (post.from_sapid ?? '').toString(),
          likes: Number(post.likes ?? 0),
          creation_date: post.creation_date,
          liked: false,
          appreciation_header: post.appreciation_header ?? ''
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

  const handleLikeClick = async (postId, currentLikes) => {
    try {
      setLikingPostId(postId);

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, likes: currentLikes + 1, liked: true } : post
        )
      );

      await PostsService.likePost(postId);
    } catch (err) {
      console.error('Error liking post:', err);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId ? { ...post, likes: currentLikes, liked: false } : post
        )
      );
    } finally {
      setLikingPostId(null);
    }
  };

  const filteredPosts = React.useMemo(() => {
    let result = [...posts];

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(post =>
        (post.Name || '').toLowerCase().includes(term) ||
        (post.SapId || '').toString().includes(term) ||
        (post.message || '').toLowerCase().includes(term)
      );
    }

    if (activeFilter === 'me' && mySapId) {
      result = result.filter(post => (post.SapId || '').toString() === mySapId.toString());
    }

    if (activeFilter === 'recent') {
      result = result.slice().reverse();
    }

    return result;
  }, [posts, searchTerm, activeFilter, mySapId]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const clearSearch = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  const handleFilter = (type) => setActiveFilter(type);

  if (loading) {
    return (
      <div className='min-h-screen'>
        <NavBar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 flex justify-center items-center h-64'>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-400 mb-4"></div>
            <p className="text-slate-400">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen'>
        <NavBar />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8 flex justify-center items-center h-64'>
          <div className="text-center glass-panel p-8 rounded-2xl max-w-md">
            <h3 className='text-xl font-medium text-white mb-2'>Something went wrong</h3>
            <p className='text-slate-400 mb-6'>{error}</p>
            <button onClick={() => window.location.reload()} className='btn-primary px-6 py-2'>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <NavBar />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Happenings</h1>
          <p className="text-slate-400 text-sm mt-1">See how your teammates are recognizing each other in real time.</p>
        </div>

        <div className={`${showSearch ? 'block' : 'hidden'} transition-all duration-300`}>
          <div className='flex flex-col md:flex-row gap-4 mb-8 sticky top-[4.75rem] z-10 py-3'>
            <div className='relative flex-grow'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <MagnifyingGlassIcon className='h-5 w-5 text-slate-500' />
              </div>
              <input
                type='text'
                placeholder='Search by name, SAP ID or message...'
                className='glass-input pl-10 pr-10 py-3'
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors'
                  aria-label='Clear search'
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className='flex gap-2'>
              {[
                { key: 'recent', label: 'Most Recent' },
                { key: 'all', label: 'All Posts' },
                { key: 'me', label: 'Me' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleFilter(key)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeFilter === key
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`fixed md:hidden bottom-6 right-6 p-3 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full shadow-lg transition-all ${showSearch ? 'rotate-45' : ''}`}
          aria-label={showSearch ? 'Hide search' : 'Show search'}
        >
          {showSearch ? <XMarkIcon className="h-6 w-6 text-white" /> : <MagnifyingGlassIcon className="h-6 w-6 text-white" />}
        </button>

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

        {filteredPosts.length === 0 && (
          <div className='text-center py-16'>
            <div className='mx-auto glass-panel p-8 rounded-2xl max-w-md'>
              <img src={assets.emptyStateIcon} alt="No posts found" className='mx-auto h-20 w-20 mb-4 opacity-70' />
              <h3 className='text-xl font-medium text-white mb-2'>
                {posts.length === 0 ? 'No posts yet' : 'No posts found'}
              </h3>
              <p className='text-slate-400 mb-6'>
                {posts.length === 0 ? 'Be the first to share an appreciation!' : 'Try adjusting your search or filter'}
              </p>
              <button onClick={clearSearch} className='btn-primary px-6 py-2'>
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
