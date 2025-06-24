import React from 'react';
import { assets } from '../assets';

const SinglePost = ({ SapId, Name, message, fromSapId }) => {
  return (
    <div className='flex flex-col gap-4 rounded-2xl p-5 border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div className='flex items-center gap-3'>
          <h1 className='font-bold text-gray-800 text-sm sm:text-base'>{SapId}</h1>
          <span className='w-px h-6 bg-gray-300 hidden sm:block'></span>
          <h1 className='text-gray-600 text-sm sm:text-base'>{Name}</h1>
        </div>
        <div className='text-xs sm:text-sm text-gray-500'>
          Received from <span className='font-medium text-gray-700'>{fromSapId}</span>
        </div>
      </div>

      <div className='p-3 bg-gray-50 rounded-lg'>
        <p className='text-gray-700 text-sm sm:text-base'>{message}</p>
      </div>

      <div className='flex justify-between items-center'>
        <span className='text-xs text-gray-400'>2 hours ago</span>
        <button 
          className='p-2 rounded-full hover:bg-amber-100 transition-all duration-200 active:scale-95'
          aria-label='Like post'
        >
          <img 
            src={assets.likeIcon} 
            alt="Like" 
            className='w-5 h-5 sm:w-6 sm:h-6 object-contain'
          />
        </button>
      </div>
    </div>
  );
};
export default SinglePost;