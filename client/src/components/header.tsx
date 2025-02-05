import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className='bg-red-500 text-white shadow-md'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center'>
          <img src='/vite.svg' alt='Diviti News' className='h-10 w-auto mr-3' />
          <span className='text-2xl font-bold tracking-wide'>Diviti News</span>
        </div>

        {/* Navigation */}
        <nav className='hidden md:flex space-x-8'>
          <Link
            to='/'
            className='text-white hover:text-gray-200 font-medium transition'
          >
            Home
          </Link>
          <Link
            to='/search'
            className='text-white hover:text-gray-200 font-medium transition'
          >
            Search
          </Link>
          <Link
            to='/about'
            className='text-white hover:text-gray-200 font-medium transition'
          >
            About
          </Link>
          <Link
            to='/contact'
            className='text-white hover:text-gray-200 font-medium transition'
          >
            Contact Us
          </Link>
        </nav>

        <div className='hidden sm:flex items-center'>
          {user ? (
            <>hello {user?.email.split("@")[0]}</>
          ) : (
            <Link
              to='/signin'
              className='bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition'
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button
            onClick={toggleMobileMenu}
            className='text-white focus:outline-none hover:text-gray-200 transition'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out  ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className='md:hidden bg-red-600 text-white space-y-4 p-4'>
          <Link
            to='/'
            className='block text-white hover:text-gray-200 font-medium transition'
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to='/search'
            className='block text-white hover:text-gray-200 font-medium transition'
            onClick={toggleMobileMenu}
          >
            Search
          </Link>
          <Link
            to='/about'
            className='block text-white hover:text-gray-200 font-medium transition'
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to='/contact'
            className='block text-white hover:text-gray-200 font-medium transition'
            onClick={toggleMobileMenu}
          >
            Contact Us
          </Link>
          {user ? (
            <div className='flex items-center justify-center font-semibold text-xl'>
              hello {user?.email.split("@")[0]}
            </div>
          ) : (
            <Link
              to='/signin'
              className='bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
