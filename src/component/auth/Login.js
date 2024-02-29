import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backendContext from '../../contex/backend/backendContext';

const Login = (props) => {
  // Accessing context to get the backend host
  const context = useContext(backendContext);
  const { host } = context;

  // State for storing user input (email and password)
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // State for managing alert messages
  const [alertMessage, setAlertMessage] = useState({ text: "", type: "" });

  // Hook for programmatic navigation
  let navigate = useNavigate();

  // Event handler for input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Function to display an alert message and redirect after a delay
  const showAlert = (text, type) => {
    setAlertMessage({ text, type });

    // Set timeout to clear the alert and redirect after 3 seconds

    setTimeout(() => {
      if(type === 'success'){
        navigate("/");
        setAlertMessage({ text: "", type: "" });

      }else{
        setAlertMessage({ text: "", type: "" });
      }
      
    }, 1000);
  };

  // Event handler for login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the login endpoint
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      // Parse the JSON response
      const json = await response.json();

      // Check if the login was successful
      if (json.success) {
        // Save authentication token and user role to local storage
        localStorage.setItem("culinashareToken", json.authtoken);

        // Clear input fields
        setCredentials({ email: "", password: "" });

        // Show success message
        showAlert('Successfully logged in', 'success');
      } else {
        // Show error message
        showAlert("Incorrect credentials, try again later", "danger");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render the login form
  return (
    <div className="login  my-5 min_height">
      {alertMessage.text && (
        <div className={`alert alert-${alertMessage.type} my-3`} role="alert">
          {alertMessage.text}
        </div>
      )}
      <h2>Log in</h2>
      <p>Don’t have an account? <Link to='/signup'>Join here</Link> </p>
      <form onSubmit={handleLogin}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            value={credentials.email}
            placeholder="Enter email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name='password'
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="custom_btn">Submit</button>
      </form>
    </div>
  );
};

export default Login;
