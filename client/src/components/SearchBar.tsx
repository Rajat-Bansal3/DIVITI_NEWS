import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onchange: (value: string) => void;
  submitt: () => void;
};

const SearchBar = ({ onchange, value, submitt }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    submitt(); // Trigger the passed submission function
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative max-w-full mx-auto w-full'
    >
      <div className='flex items-center bg-white shadow-md rounded-full overflow-hidden p-2'>
        <Search className='w-5 h-5 text-gray-500 ml-3' />
        <input
          value={value}
          onChange={(e) => onchange(e.target.value)}
          type='text'
          placeholder='Search artworks, artists, or collections...'
          className='flex-1 bg-transparent border-none focus:outline-none px-3 text-gray-700'
        />
        <button
          type='submit'
          className='bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
