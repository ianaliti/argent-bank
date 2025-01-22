import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import './SignIn.css'

export default function SignIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
      });
    
      const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [id]: type === 'checkbox' ? checked : value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
      };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <Link to="/user" className="sign-in-button-alt">
        <button type="submit" className="sign-in-button">Sign In</button>
      </Link>
    </form>
  )
}
