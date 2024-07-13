// LoginContent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Logincontent.css';

function LoginContent() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isRegistering ? 'http://localhost:8000/register' : 'http://localhost:8000/token';
    const defaultData = isRegistering ? { username: 'defaultUser', password: 'defaultPassword' } : { username: 'defaultUser', password: 'defaultPassword' };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(defaultData),
    });

    if (response.ok) {
      navigate('/home');
    } else {
      const data = await response.json();
      setError(data.detail);
    }
  };

  return (
    <div className="container">
      <div className={`form-container ${isRegistering ? 'hidden' : ''}`}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h1>Welcome</h1>
          <span className="register-text">
            Don't have an account? <a onClick={() => setIsRegistering(true)} className="register-btn">Register</a>
          </span>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Quick Login</button>
          <div className="social-icons">
            <a href="/google_creds" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
          </div>
        </form>
      </div>

      <div className={`form-container ${isRegistering ? '' : 'hidden'}`}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="register-header">
            <h2 className="register-title">Register</h2>
            <span className="register-description">Register to see this app function</span>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Quick Register</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <img className="home-img" src="path/to/home_img.svg" alt="home" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginContent;
