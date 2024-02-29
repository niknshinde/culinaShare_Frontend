import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import backendContext from '../contex/backend/backendContext';

const Creatingres = (props) => {
  // Accessing context to get the backend host
  
  const context = useContext(backendContext)


  const { host } = context;

  // State for storing user input (name, email, password, etc.)
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    recipeName: '',
    preparationTime: '',
    ingredients: [{ name: '', quantity: '' }],
    recipeImage: '',
    youtubeLink: '',
    details: '',
    options: []
  });

  // State for managing alert messages
  const [alertMessage, setAlertMessage] = useState({ text: '', type: '' });

  // Hook for programmatic navigation
  const navigate = useNavigate();



  // Event handler for input changes
  const onChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'options') {
      // Handle options (multiple selection)
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setCredentials({ ...credentials, options: selectedOptions });
    } else if (name === 'ingredients') {
      const newIngredients = [...credentials.ingredients];
      if (e.target.classList.contains('name')) {
        newIngredients[index].name = value;
      } else if (e.target.classList.contains('quantity')) {
        newIngredients[index].quantity = value;
      }
      setCredentials({ ...credentials, ingredients: newIngredients });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  // Function to add new ingredient input fields
  const addIngredientField = () => {
    setCredentials({
      ...credentials,
      ingredients: [...credentials.ingredients, { name: '', quantity: '' }]
    });
  };

  // Function to remove ingredient input fields
  const removeIngredientField = (index) => {
    const newIngredients = [...credentials.ingredients];
    newIngredients.splice(index, 1);
    setCredentials({ ...credentials, ingredients: newIngredients });
  };

  // Function to display an alert message and redirect after a delay
  const showAlert = (text, type) => {
    setAlertMessage({ text, type });
    setTimeout(() => {
      if (type === 'success') {
        // Redirect to "/" after a successful sign-up
        navigate('/');
        setAlertMessage({ text: '', type: '' });
      } else {
        // Clear the alert without redirecting for other cases
        setAlertMessage({ text: '', type: '' });
      }
    }, 1500); // Message will disappear after 1.5 seconds
  };

  // Event handler for sign-up form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      recipeName,
      preparationTime,
      ingredients,
      recipeImage,
      youtubeLink,
      details,
      options
    } = credentials;

    try {
      // Make a POST request to the create endpoint
      const response = await fetch(`${host}/api/foodresp/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('culinashareToken')
     },
        body: JSON.stringify({
          name,
          email,
          password,
          recipeName,
          preparationTime,
          ingredients,
          recipeImage,
          youtubeLink,
          details,
          options
        }),
      });

      // Parse the JSON response
      const json = await response.json();
      console.log(json);


      if (json) {
        // Show success message
        showAlert('recipe saved successfully signed in', 'success');
      } else {
        // Show error message
        showAlert('Incorrect credentials, try again later', 'danger');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
      
  if(!localStorage.getItem('culinashareToken')){
    navigate('/login');

  }
  },[])

  // Render the sign-up form
  return (
    <div className="signup  my-5 min_height">
      {alertMessage.text && (
        <div className={`alert alert-${alertMessage.type} my-3`} role="alert">
          {alertMessage.text}
        </div>
      )}
      <h2 className='mb-4'>ADD RECIPE HERE</h2>
    

      <form onSubmit={handleSubmit}>
        {/* Existing fields */}
        <div className="form-group">
          {/* Existing fields */}
        </div>

        {/* New fields for recipe */}
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            className="form-control"
            id="recipeName"
            name="recipeName"
            value={credentials.recipeName}
            required
            minLength={2}
            onChange={onChange}
          />
        </div>

        {/* Preparation Time */}
        <div className="form-group">
          <label htmlFor="preparationTime">Preparation Time (in minutes)</label>
          <input
            type="number"
            className="form-control"
            id="preparationTime"
            name="preparationTime"
            value={credentials.preparationTime}
            required
            onChange={onChange}
          />
        </div>

        {/* Ingredients (dynamic input fields) */}
        <div className="form-group">
  <label>Ingredients</label>
  {credentials.ingredients.map((ingredient, index) => (
    <div key={index} className="d-flex mb-2">
      <input
        type="text"
        className="name form-control mr-2"
        name="ingredients" // corrected name attribute
        value={ingredient.name}
        onChange={(e) => onChange(e, index)}
      />
      <input
        type="text"
        className="quantity form-control mr-2"
        name="ingredients" // corrected name attribute
        placeholder="Quantity"
        value={ingredient.quantity}
        onChange={(e) => onChange(e, index)}
      />
      {index === 0 ? (
        <button type="button" className="btn btn-secondary" onClick={addIngredientField}>+</button>
      ) : (
        <button type="button" className="btn btn-danger" onClick={() => removeIngredientField(index)}>-</button>
      )}
    </div>
  ))}
</div>
        {/* Recipe Image */}
        <div className="form-group">
          <label htmlFor="recipeImage">Recipe Image URL</label>
          <input
            type="url"
            className="form-control"
            id="recipeImage"
            name="recipeImage"
            value={credentials.recipeImage}
            onChange={onChange}
          />
        </div>

        {/* YouTube Link */}
        <div className="form-group">
          <label htmlFor="youtubeLink">YouTube Link</label>
          <input
            type="url"
            className="form-control"
            id="youtubeLink"
            name="youtubeLink"
            value={credentials.youtubeLink}
            onChange={onChange}
          />
        </div>

        {/* Details */}
        <div className="form-group">
          <label htmlFor="details">Recipe Details</label>
          <textarea
            className="form-control"
            id="details"
            name="details"
            value={credentials.details}
            onChange={onChange}
          />
        </div>

        {/* Options (multiple selection) */}
        <div className="form-group">
          <label htmlFor="options">Category</label>
          <select
            className="form-control"
            id="options"
            name="options"
            multiple
            onChange={onChange}
          >
            <option value="starter">Starter</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non vegetarian">Non Vegetarian</option>
            <option value="dessert">Dessert</option>
            <option value="quick recipes">Quick Recipes</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          disabled={credentials.cpassword !== credentials.password}
          type="submit"
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Creatingres;
