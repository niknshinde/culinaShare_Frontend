import React from 'react';

const About = () => {
  return (
    <div className="about-section">
      <h2>Welcome to CulinaShare!</h2>
      <p>CulinaShare is your go-to platform for sharing and discovering delicious recipes. Whether you're a seasoned chef or a culinary enthusiast, CulinaShare is the perfect place to connect with others who share your passion for cooking.</p>
      
      <h3>What We Offer:</h3>
      <ul>
        <li>Create an Account: Sign up for free and join our vibrant community of food lovers.</li>
        <li>Share Recipes: Showcase your culinary creations and inspire others with your favorite dishes.</li>
        <li>Communicate: Connect with fellow foodies, exchange tips, and discuss all things food-related.</li>
        <li>Bookmark Recipes: Save your favorite recipes for quick and easy access whenever you need them.</li>
      </ul>
      
      <p>At CulinaShare, we believe that food has the power to bring people together. Join us in celebrating the joy of cooking and sharing delicious meals!</p>
      
      <div className="emoji-section">
        <span role="img" aria-label="Chef">👩‍🍳</span>
        <span role="img" aria-label="Food">🥘</span>
        <span role="img" aria-label="Heart">❤️</span>
        <span role="img" aria-label="Community">👥</span>
      </div>
    </div>
  );
};

export default About;
