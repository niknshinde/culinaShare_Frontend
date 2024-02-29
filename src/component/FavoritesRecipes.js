import React, { useState, useEffect, useContext } from 'react';
import backendContext from '../contex/backend/backendContext';
import RenderCards from './RenderCards';
import { useNavigate, Link } from 'react-router-dom';


function FavoritesRecipes() {
  const navigate = useNavigate();

  const context = useContext(backendContext);
  const { host } = context;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if(!localStorage.getItem('culinashareToken')){
      navigate('/login');
    }
    const fetchBookmarkedRecipes = async () => {
      try {
        const response = await fetch(`${host}/api/foodresp/user-bookmarks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('culinashareToken')
          }
        });
        const json = await response.json();
        setRecipes(json);
      } catch (error) {
        console.error('Error fetching bookmarked recipes:', error);
      }
    };

    fetchBookmarkedRecipes();
  }, []);

  return (
    <div>
      <h2 className='mb-5'>Favorite Recipes</h2>
      {recipes.length === 0 ? (
        <p>No favorite recipes found.</p>
      ) : (
        <RenderCards recipes={recipes} />
      )}
    </div>
  );
}

export default FavoritesRecipes;
