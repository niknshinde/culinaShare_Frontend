import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
         <a href="/"><img src="/images/logo.png" alt="Logo" /></a> 
        </div>
        <div className="footer-info">
          <h3>Contact Information</h3>
          <p>Email: info@Culinashare.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <img src="/images/instagram.png" alt="instagram" />
            </a>
            <a href="https://twitter.com/talentsphere" target="_blank" rel="noopener noreferrer">
              <img src="/images/twittwr.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
