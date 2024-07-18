import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('culinashareToken');
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    setShowProfileDropdown(false);
  }, [location]);

  return (
    <nav className="w-full bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl" onClick={handleLinkClick}>
              CulinaShare
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    location.pathname === '/' ? 'bg-gray-900 text-white' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
                <Link
                  to="/favorites"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    location.pathname === '/favorites' ? 'bg-gray-900 text-white' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  Favorite Recipes
                </Link>
                <Link
                  to="/addRecipe"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    location.pathname === '/addRecipe' ? 'bg-gray-900 text-white' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  Add Recipe
                </Link>
                <Link
                  to="/about"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    location.pathname === '/about' ? 'bg-gray-900 text-white' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  About
                </Link>

                <Link
                  to="/chatbot"
                  className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md ${
                    location.pathname === '/chatbot' ? 'bg-gray-900 text-white' : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  AI Help
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {localStorage.getItem('culinashareToken') ? (
                <div className="profile">
                  <Link to="/profile" aria-pressed="true" onClick={handleLinkClick}>
                    <i className="bi bi-person-circle text-white"></i>
                  </Link>
                </div>
              ) : (
                <div className="flex">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md"
                    onClick={handleLinkClick}
                  >
                    SignUp
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md ${
              location.pathname === '/' ? 'bg-gray-900 text-white' : ''
            }`}
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md ${
              location.pathname === '/favorites' ? 'bg-gray-900 text-white' : ''
            }`}
            onClick={handleLinkClick}
          >
            Favorite Recipes
          </Link>
          <Link
            to="/addRecipe"
            className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md ${
              location.pathname === '/addRecipe' ? 'bg-gray-900 text-white' : ''
            }`}
            onClick={handleLinkClick}
          >
            Add Recipe
          </Link>
          <Link
            to="/about"
            className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md ${
              location.pathname === '/about' ? 'bg-gray-900 text-white' : ''
            }`}
            onClick={handleLinkClick}
          >
            About
          </Link>
          {localStorage.getItem('culinashareToken') ? (
            <div className="profile">
              <Link to="/profile" aria-pressed="true" onClick={handleLinkClick}>
                <i className="bi bi-person-circle text-white"></i>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md"
                onClick={handleLinkClick}
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;