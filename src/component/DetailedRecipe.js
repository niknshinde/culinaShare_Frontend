import React, { useEffect, useState, useContext } from "react";
import { useParams , useNavigate } from "react-router-dom";

import backendContext from "../contex/backend/backendContext";

const DetailedRecipe = () => {
    const navigate = useNavigate();

  const context = useContext(backendContext);
  const { host } = context;
  const { recipeId } = useParams();
  console.log("id is", recipeId);

  const [recipe, setRecipe] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); // State to track bookmark status

  useEffect(() => {
    if(!localStorage.getItem('culinashareToken')){
        navigate('/login');
    
      }

    const fetchRecipeDetails = async (recipeId) => {
      try {
        const response = await fetch(
          `${host}/api/foodresp/detailedrecipe/${recipeId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("culinashareToken"),
            },
          }
        );
        const json = await response.json();
        console.log(json.isBookmark);
        setRecipe(json);
        setIsBookmarked(json.isBookmark)
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        // Handle any error, e.g., show an error message or redirect to an error page
      }
    };

    fetchRecipeDetails(recipeId);
  }, [recipeId]);

  // Function to toggle bookmark status
  // Function to toggle bookmark status
const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        // If already bookmarked, send a DELETE request to remove the bookmark
        const response = await fetch(
          `${host}/api/foodresp/delete-user-bookmarks/${recipeId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("culinashareToken"),
            },
          }
        );
        if (response.ok) {
          setIsBookmarked(false); // Update bookmark status in the UI
          console.log("Bookmark removed successfully");
        } else {
          console.error("Error removing bookmark");
        }
      } else {
        // If not bookmarked, send a POST request to add the bookmark
        const response = await fetch(`${host}/api/foodresp/user-bookmarks/${recipeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("culinashareToken"),
          },
        });
        if (response.ok) {
          setIsBookmarked(true); // Update bookmark status in the UI
          console.log("Bookmark added successfully");
        } else {
          console.error("Error adding bookmark");
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // Handle any error
    }
  };
  

  return (
    <div className="recipe-details">
      {recipe ? (
        <>
          <div className="flex-class mb-4">
          <h1>{recipe.recipe.recipeName}</h1>
          <button className="custom_btn" onClick={handleBookmarkToggle}>
            {isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
          </button>
          </div>

          <hr />

          <div className="centering mb-4">
          <img className="detailed-image"
            src={recipe.recipe.recipeImage}
            alt={recipe.recipe.recipeName}
          />
          </div>
        <h2>Preparation Time:</h2>
          <p>{recipe.recipe.preparationTime} minutes</p>
          <p>
            {/* <strong>Description:</strong> {recipe.recipe.description} */}
          </p>
          <h2>Ingredients:</h2>
          <table className="table .table-primary">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {recipe.recipe.ingredients.map((ingredient) => (
                <tr key={ingredient._id}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <h2 className="my-4">Instructions:</h2>

          <p className="detailedPara">{recipe.recipe.details}</p>

          

          <h2>YouTube Video:</h2>

          <div className="centering">

          <iframe
            // width="90%"
            // height="200rem"
            className="youtube_video"
            src={recipe.recipe.youtubeLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>

          </div>

          <button className="custom_btn mt-4"><a href={recipe.recipe.youtubeLink}>If Video Not Working Click Here </a>

</button>
          {/* Bookmark Button */}
         
        </>
      ) : (
        <div>
          <p>Loading recipe data...</p>
        </div>
      )}
    </div>
  );
};

export default DetailedRecipe;
