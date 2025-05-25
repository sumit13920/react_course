import React, { useState,useEffect, useContext  } from 'react';
import {useNavigate, Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Signup = () => {
  const [credentials, setCredentials] = useState({ 
    name: '',
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const context = useContext(noteContext);
  const { registerUser, loading, isAuthenticated, error } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password !== credentials.confirmPassword) {
      context.setError("Passwords don't match");
      return;
    }
    try {
      const result = await registerUser({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      });
      if(result && result.user) {
        navigate('/login');
      }
    } catch (error) {
      // Error handled in context
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !credentials.name || !credentials.email || !credentials.password}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status"></span>
              Creating account...
            </>
          ) : 'Sign Up'}
        </button>
      </form>
      <div className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </div>
    </div>
  );
};

export default Signup;