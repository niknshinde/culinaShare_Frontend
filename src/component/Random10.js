import React, { useState, useEffect , useContext} from 'react';
import backendContext from '../contex/backend/backendContext';
import DetailedRecipe from './DetailedRecipe';
import RenderCards from './RenderCards';



const Random10 = () => {
    const context = useContext(backendContext);
  const { host } = context;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${host}/api/foodresp/random-recipes`,{
            method: 'GET',

        });
        const json = await response.json();
        setRecipes(json);
    } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

  

    fetchRecipes();
  }, []);

  return (
    (!recipes) ? <p>loading data....</p> : 
    <RenderCards recipes={recipes} />
);
};

export default Random10;
