import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const port = 4000;

function App() {
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regMessage, setRegMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = () => {
    fetch(`http://localhost:${port}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: regEmail, password: regPassword }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Registration failed');
        }
      })
      .then((data) => {
        setRegMessage(data.message);
        setRegEmail('');
        setRegPassword('');
      })
      .catch((error) => {
        console.error('Registration error:', error);
        setRegMessage('Registration failed. Please try again later.');
      });
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setLoginMessage('Please enter both email and password.');
    } else {
      fetch(`http://localhost:${port}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setLoginMessage('Login successful.');
            setLoginEmail('');
            setLoginPassword('');
            navigate('/about-us');
          } else {
            setLoginMessage('Login failed. Please check your credentials.');
          }
        })
        .catch((error) => setLoginMessage('Login failed. Please try again later.'));
    }
  };
  
  return (
    <div className="App">
      <h1>Registration and Login</h1>

      <h2>Register</h2>
      <input
        type="text"
        placeholder="Email"
        value={regEmail}
        onChange={(e) => setRegEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={regPassword}
        onChange={(e) => setRegPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{regMessage}</p>

      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{loginMessage}</p>
    </div>
  );
}

export default App;
