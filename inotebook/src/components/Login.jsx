import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(noteContext);
  const { loginUser, loading, error, isAuthenticated } = context;
  const navigate = useNavigate();

  // Add this useEffect for auth redirection
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(credentials);
      console.log("Login success:", result);


      if (result && result.user) {
        navigate("/");
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
      <h2>Login to iNotebook</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !credentials.email || !credentials.password}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
              ></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="mt-3">
        New user? <Link to="/signup">Create account</Link>
      </div>
    </div>
  );
};

export default Login;
