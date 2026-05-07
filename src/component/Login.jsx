import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';

function Login({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [secretkey, setSecretkey] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usertype === 'Admin') {
      if (secretkey === 'Admin404' && email === 'admin1234@gmail.com' && password === '123456') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', 'Admin');
        onLogin('Admin');
        navigate('/dashboard');
      } else {
        alert('Invalid Admin credentials or secret key');
      }
    } else {
      try {
        const res = await axios.post('http://localhost:3001/login', { email, password });

        if (res.data && res.data.email) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userType', 'User');
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          localStorage.setItem("email", email);

          onLogin('User');
          navigate('/Profile');
        } else {
          alert(res.data.email);
        }
      } catch (err) {
        console.log(err);
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="ll">
      <div className="login-container">
        <h2>Login to continue with us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group1" style={{ marginTop: '70px' }}>
            <div className="selectUser">
              <label htmlFor="login" style={{ fontSize: '23px' }}>
                Login
              </label>
              <label htmlFor="User">User</label>
              <input
                type="radio"
                name="UserType"
                value="User"
                onChange={(e) => setUsertype(e.target.value)}
              />
              <label htmlFor="Admin">Admin</label>
              <input
                type="radio"
                name="UserType"
                value="Admin"
                onChange={(e) => setUsertype(e.target.value)}
              />
            </div>

            {usertype === 'Admin' && (
              <div className="form-group1">
                <label htmlFor="secretkey">Secret Key</label>
                <input
                  type="password"
                  value={secretkey}
                  onChange={(e) => setSecretkey(e.target.value)}
                  id="secretkey"
                  name="secretkey"
                  required
                  minLength="4"
                />
              </div>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              required
              minLength="5"
            />
          </div>

          <div className="form-group1">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="btnlo">
            Login
          </button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/Register">Register here</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;
