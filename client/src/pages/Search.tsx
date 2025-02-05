import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import { tagsSchema } from "@/types/post";
import DateFilter from "@/components/DateFilter";
import { useQuery } from "@tanstack/react-query";
import { search } from "@/api/search_api";
import { PostCard } from "@/components/PostCard";

const Search = () => {
  const location = useLocation();
  const nav = useNavigate();
  const query = qs.parse(location.search);

  const selectedFilters = query.filters ? query.filters.split(",") : [];
  const searchQuery = query.search || "";

  const { data, error, isError, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["news", searchQuery, selectedFilters],
    queryFn: () => search(searchQuery as string, selectedFilters),
    enabled: !searchQuery,
    staleTime: 5000,
  });

  const handleSearchSubmit = () => {
    console.log("Search submitted:", searchQuery);
    console.log("tags submitted:", selectedFilters);
    refetch();
  };
  const handleFilterChange = (updatedFilters: string[]) => {
    const newQuery = {
      ...query,
      filters: updatedFilters.length > 0 ? updatedFilters.join(",") : undefined,
    };
    nav({
      search: qs.stringify(newQuery),
    });
  };

  const handleSearchChange = (searchValue: string) => {
    const newQuery = {
      ...query,
      search: searchValue || undefined,
    };
    nav({
      search: qs.stringify(newQuery),
    });
  };

  const filterOptions = tagsSchema._def.type._def.values.map((cat) => ({
    label: cat,
    value: cat.toLowerCase(),
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4'>
      <div className='max-w-2xl w-full'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-4'>Search</h1>
        <p className='text-lg text-gray-600 mb-6'>
          Find the latest articles, insights, and updates from{" "}
          <span className='font-semibold text-red-500'>Diviti News</span>.
        </p>

        <SearchBar
          value={searchQuery as string}
          onchange={handleSearchChange}
          submitt={handleSearchSubmit}
        />

        <Filter
          title='Categories'
          options={filterOptions}
          selectedOptions={selectedFilters}
          onChange={handleFilterChange}
        />
        <div className='border my-6' />

        {isSuccess &&
          data &&
          data.data.length > 0 &&
          data.data.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
