import React, { useEffect, useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RenderCards from './RenderCards';
import backendContext from '../contex/backend/backendContext';


const Profile = () => {
  const context = useContext(backendContext);
  const { host } = context;
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('culinashareToken');
    navigate('/');
  };

  const getUserCreatedRecipes = async () => {
    try {
      const response = await fetch(`${host}/api/foodresp/user-created`, {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem('culinashareToken'),
        }
      });

      if (response.ok) {
        const createdRecipes = await response.json();
        setRecipes(createdRecipes);
      } else {
        const errorData = await response.json();
        console.error('Error fetching user-created recipes:', errorData.msg);
      }
    } catch (error) {
      console.error('Error fetching user-created recipes:', error);
    }
  };

  useEffect(() => {
    getUserCreatedRecipes();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="profile2 ">
      <h1 className='mb-4'>Created Recipes By You</h1>
     { (!recipes) ? <p>loading data....</p> : 
    <RenderCards recipes={recipes} />}

      <button onClick={handleLogOut} className="custom_btn mt-4">
        Log-Out
      </button>
    </div>
  );
};

export default Profile;
