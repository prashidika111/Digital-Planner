import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome({ onLogin }) {
  const [showAuth, setShowAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleOpenForm = () => {
    setShowAuth(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length >= 3) {
      onLogin(username);
      navigate('/home');
    }
  };

  return (
    <div id="welcome">
      <div className="card">
        <h1 className="title">get started 🐾</h1>

        {!showAuth && (
          <div id="welcomeBtns" className="welcome-buttons">
            <button onClick={handleOpenForm}>Login</button>
            <button onClick={handleOpenForm}>Sign Up</button>
          </div>
        )}

        {showAuth && (
          <div id="authBox">
            <form id="authForm" onSubmit={handleSubmit}>
              <input 
                type="text" 
                id="username" 
                placeholder="Username" 
                required minLength="3"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input 
                type="password" 
                id="password" 
                placeholder="Password" 
                required minLength="5"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button type="submit">Continue</button>
              <button type="reset" onClick={() => {setUsername(''); setPassword('')}}>Reset</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
