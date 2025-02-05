import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/post_api";
import { PostCard } from "@/components/PostCard";
import { Post } from "@/types/post";
import { PostCardSkeleton } from "@/components/skeletons";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["news"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 overflow-hidden'>
        <h1 className='text-2xl font-bold mb-6'>Home Page</h1>
        <div className='flex flex-wrap gap-4'>
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className='flex-1 min-w-[300px] max-w-[calc(33%-1rem)]'
            >
              <PostCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    nav("/err", { state: { error } });
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Home Page</h1>
      {isSuccess && data && (
        <div className='flex flex-wrap gap-4'>
          {data.data.map((post: Post) => (
            <div
              key={post._id}
              className='flex-1 min-w-[300px] max-w-[calc(33%-1rem)]'
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
