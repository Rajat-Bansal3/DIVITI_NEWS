import { Link, useLocation } from "react-router-dom";

type Props = {
  unknown?: boolean;
};

const Error = ({ unknown }: Props) => {
  const location = useLocation();
  const err = location.state.error.message;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center w-96'>
        <h1 className='text-4xl font-bold text-red-600 mb-4'>
          {unknown ? "404 - Page Not Found" : "Something Went Wrong"}
        </h1>
        <p className='text-lg text-gray-700 mb-4'>
          {unknown
            ? "The page you are looking for does not exist. Please check the URL or go back to the home page."
            : "We're sorry, but there seems to be an issue with our system. Please try again later."}
        </p>

        {!unknown && err && (
          <div className='text-sm text-gray-500'>
            <h3 className='font-semibold mb-2'>Technical Details:</h3>
            <p className='overflow-hidden text-ellipsis'>{err.errorMessage}</p>
          </div>
        )}

        <div className='mb-6'>
          <img
            src='/images/error-icon.png'
            alt='Error Icon'
            className='w-20 h-20 mx-auto mb-4'
          />
        </div>

        <div className='flex justify-center gap-4'>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600'
          >
            Retry
          </button>
          <Link to='/' className='text-blue-500 hover:underline'>
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
