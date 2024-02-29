import React from 'react'
import { Link } from 'react-router-dom';

const RenderCards = (props) => {
    const { recipes } = props;

    // Check if recipes is an array
    if (!Array.isArray(recipes)) {
        // If it's not an array, return a message or null
        return <p>No recipes found</p>; // You can customize this message
    }

    // If recipes is an array, proceed with mapping
    return (
        <div className='outerContainer'>
            {recipes.map((recipe) => (
                <Link to={`/deailedRecipe/${recipe._id}`} key={recipe._id}>
                    <div className="item">
                        <div className="card">
                            <img className='card-image' src={recipe.recipeImage} alt={recipe.recipeName} />
                            <div className="card-content">
                                <h3>{recipe.recipeName}</h3>
                                <p>Preparation Time: {recipe.preparationTime} mins</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RenderCards;
