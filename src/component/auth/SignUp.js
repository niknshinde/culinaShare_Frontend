import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backendContext from '../../contex/backend/backendContext';

const SignUp = (props) => {
  // Accessing context to get the backend host
  const context = useContext(backendContext);
  const { host } = context;

  // State for storing user input (name, email, password, etc.)
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
  });

  // State for managing alert messages
  const [alertMessage, setAlertMessage] = useState({ text: '', type: '' });

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Event handler for input changes
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
    const { username, email, password } = credentials;

    try {
      // Make a POST request to the createuser endpoint
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // Parse the JSON response
      const json = await response.json();
      console.log(json);

      localStorage.setItem('culinashareToken', json);

      if (json) {
        // Show success message
        showAlert('Successfully signed in', 'success');
      } else {
        // Show error message
        showAlert('Incorrect credentials, try again later', 'danger');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render the sign-up form
  return (
    <div className="signup  my-5 min_height">
      {alertMessage.text && (
        <div className={`alert alert-${alertMessage.type} my-3`} role="alert">
          {alertMessage.text}
        </div>
      )}
      <h2 className='mb-4'>Sign Up</h2>
      

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={credentials.username}
            placeholder="Enter User Name"
            required
            minLength={2}
            onChange={onChange}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={credentials.email}
            placeholder="Enter email"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            required
            minLength={6}
            value={credentials.cpassword}
            onChange={onChange}
          />
        </div>


        <button
          disabled={credentials.cpassword !== credentials.password}
          type="submit"
          className="custom_btn"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
