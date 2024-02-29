import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem('culinashareToken');
    navigate('/');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleMobileLinkClick = () => {
    // Close the mobile menu when a link is clicked
    setIsMobileMenuOpen(false);
  };

  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    // Close the profile dropdown when the route changes
    setShowProfileDropdown(false);
  }, [location]);

  return (
    <nav className="make_top navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CulinaShare
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu state
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-current="page"
                to="/"
                onClick={handleMobileLinkClick} // Close mobile menu when a link is clicked
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                aria-current="page"
                to="/favorites"
                onClick={handleMobileLinkClick} // Close mobile menu when a link is clicked
              >
                Favorite Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/addRecipe' ? 'active' : ''}`}
                to="/addRecipe"
                onClick={handleMobileLinkClick} // Close mobile menu when a link is clicked
              >
                Add Recipe
              </Link>
            </li>


            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
                aria-current="page"
                to="/about"
                onClick={handleMobileLinkClick} // Close mobile menu when a link is clicked
              >
                About
              </Link>
            </li>
          </ul>

          {localStorage.getItem('culinashareToken') ? (
            <div className="profile">
              <Link to="/profile" aria-pressed="true">
                <i class="bi bi-person-circle"></i>
              </Link>
            </div>
          ) : (
            <form className="flex-form" role="search">
              <Link to="/login" aria-pressed="true">
                <button className="custom_btn mx-3" onClick={handleMobileLinkClick}>
                  Login
                </button>
              </Link>
              <Link to="/signup" aria-pressed="true">
                <button className="custom_btn" onClick={handleMobileLinkClick}>
                  SignUp
                </button>
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
