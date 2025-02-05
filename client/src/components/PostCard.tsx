import { Post } from "@/types/post";
import { Cloud, Heart, UserPen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className='post-card bg-white shadow-md rounded-lg p-6 mb-6 hover:bg-gray-50 updash'>
      <Link to={`/post/${post._id}`}>
        <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
        <p className='line-clamp-2 text-gray-700 mb-4'>{post.description}</p>
        <span className='text-blue-600'>See more</span>
      </Link>
      <div className='text-sm text-gray-500 mb-4'>
        <span>Posted on: {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      {post.yt && (
        <a
          href={post.yt}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:underline'
        >
          Watch on YouTube
        </a>
      )}
      <div className='flex flex-wrap gap-4 items-center'>
        {post.author?.email && (
          <div className='flex items-center gap-2'>
            <UserPen className='w-4 h-4' aria-label='Author' />
            <span>{post.author.email}</span>
          </div>
        )}
        {post.likes && (
          <div className='flex items-center gap-2'>
            <Heart className='w-4 h-4 text-red-500' aria-label='Likes' />
            <span>{post.likes.length} Likes</span>
          </div>
        )}
        {post.comments && (
          <div className='flex items-center gap-2'>
            <Cloud className='w-4 h-4 text-blue-500' aria-label='Comments' />
            <span>{post.comments.length} Comments</span>
          </div>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className='flex items-center gap-2'>
            <p className='font-medium'>Tags:</p>
            <ul className='flex flex-wrap gap-2'>
              {post.tags.map((tag, index) => (
                <li key={index} className='text-gray-600'>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
