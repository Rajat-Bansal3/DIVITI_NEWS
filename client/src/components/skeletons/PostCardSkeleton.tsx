import React from "react";

export const PostCardSkeleton: React.FC = () => {
  return (
    <div className='post-card bg-white shadow-md rounded-lg p-6 mb-6 hover:bg-gray-50 updash animate-pulse'>
      <div className='h-6 bg-gray-300 rounded w-3/4 mb-4'></div>
      <div className='h-4 bg-gray-300 rounded w-2/4 mb-4'></div>
      <div className='h-4 bg-gray-300 rounded w-1/3 mb-6'></div>

      <div className='text-sm text-gray-500 mb-4'>
        <div className='h-3 bg-gray-300 rounded w-1/4'></div>
      </div>

      <div className='flex flex-wrap gap-4 items-center'>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
          <div className='h-4 bg-gray-300 rounded w-24'></div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
          <div className='h-4 bg-gray-300 rounded w-12'></div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
          <div className='h-4 bg-gray-300 rounded w-16'></div>
        </div>
        <div className='flex items-center gap-2'>
          <div className='h-4 bg-gray-300 rounded w-16'></div>
        </div>
      </div>
    </div>
  );
};
