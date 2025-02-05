import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/api/post_api";
import { useParams } from "react-router-dom";
import { Loader } from "@/components/Loader";
import { Youtube } from "@/assets";
import { ThumbsUpIcon } from "lucide-react";

const Post = () => {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id!),

    enabled: !!id,
  });
  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error?.message}</div>;
  const post = data?.data;
  return (
    <>
      {post && (
        <div className='max-w-4xl mx-auto p-6'>
          <h1 className='text-3xl font-bold mb-4 flex justify-center items-center gap-2'>
            {post?.title}
            {post?.yt && (
              <a
                href={post.yt}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline mb-4 inline-flex items-center'
              >
                <img
                  src={Youtube}
                  alt='YouTube Icon'
                  className='w-6 h-6 mt-3 ml-3 cursor-pointer hover:scale-110 transition-transform duration-200'
                />
              </a>
            )}
          </h1>
          {post?.images && post.images.length > 0 && (
            <img
              src={post.images[0]}
              alt='Post Image'
              className='w-full h-auto mb-6 rounded-lg shadow-md'
            />
          )}
          {post?.tags && post.tags.length > 0 && (
            <div className='mb-4'>
              <p className='font-semibold text-gray-700'>Tags:</p>
              <ul className='list-disc pl-5'>
                {post.tags.map((tag, index) => (
                  <li key={index} className='text-gray-600'>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {post?.author && (
            <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
              <span>Written by:</span>
              <span className='font-semibold'>
                {post.author.email.split("@")[0]}
              </span>
            </div>
          )}
          <div className='text-gray-800 mb-6'>
            <p>{post?.content}</p>
          </div>
          <div className='flex gap-8 mb-4 text-sm text-gray-600'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold text-red-500'>
                <ThumbsUpIcon className={""} />
              </span>
              <span>
                {
                  post?.likes.length //WIP : add functionality
                }
              </span>
            </div>
          </div>
          <div className='border-t pt-6'>
            <h3 className='text-xl font-semibold text-gray-700'>
              Comments <span>{post?.comments.length}</span>
            </h3>
            {post?.comments && post?.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <div key={index} className='mt-4'>
                  <div className='flex gap-2'>
                    <span className='font-semibold text-gray-800'>
                      {comment.author}
                    </span>
                    <span className='text-sm text-gray-500'>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className='mt-2'>{comment.content}</p>
                  {comment.children && comment.children.length > 0 && (
                    <div className='mt-2 text-gray-600'>see replies</div> //WIP : add functionality
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
