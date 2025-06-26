import React, { useState } from 'react';

const SinglePost = ({ SapId, Name, message, fromSapId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Truncate message if needed
  const maxLength = 150;
  const shouldTruncate = message.length > maxLength && !isExpanded;
  const displayMessage = shouldTruncate ? `${message.substring(0, maxLength)}...` : message;

  return (
    <div className='w-full'>
      <div className='flex flex-col h-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 border border-blue-100'>
        {/* Header with bright background */}
        <div className='bg-gradient-to-r from-blue-500 to-cyan-500 p-4'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold'>
              {Name.charAt(0)}
            </div>
            <div>
              <h2 className='text-lg font-semibold text-white'>{Name}</h2>
              <p className='text-sm text-white/90'>SAP ID: {SapId}</p>
            </div>
          </div>
        </div>

        {/* Message content */}
        <div className='p-5 bg-white flex-grow'>
          <div className='mb-4'>
            <p className='text-gray-700 whitespace-pre-line'>
              {displayMessage}
              {shouldTruncate && (
                <button 
                  onClick={() => setIsExpanded(true)}
                  className='ml-1 text-blue-600 hover:underline focus:outline-none'
                >
                  Read more
                </button>
              )}
              {isExpanded && (
                <button 
                  onClick={() => setIsExpanded(false)}
                  className='ml-1 text-blue-600 hover:underline focus:outline-none'
                >
                  Show less
                </button>
              )}
            </p>
          </div>
        </div>

        {/* Footer with actions */}
        <div className='px-5 pb-4 bg-gray-50'>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-gray-600'>
              From: <span className='font-medium text-blue-600'>{fromSapId}</span>
            </div>
            <div className='flex items-center gap-3'>
              <span className='text-xs text-gray-500'>2h ago</span>
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-1.5 rounded-full transition-colors ${
                  isLiked 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                }`}
                aria-label={isLiked ? 'Unlike post' : 'Like post'}
              >
                {isLiked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;