import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, registerUser } from '../../redux/authAction';
import './Login.css'


export default function Login() {
  const { loading, error, userToken } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister }, reset } = useForm();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (userToken) {
      navigate("/user/profile")
    }
  }, [userToken, navigate]);

  const onSubmitForm = async (data) => {
    try {
      const result = await dispatch(userLogin({
        email: data.email,
        password: data.password
      })).unwrap();

      if (result) {
        navigate('/user/profile')
      }

    } catch (err) {
      console.error('Login failed:', err)
    }
  };

  const onSubmitRegister = async (data) => {
    try {
      const result = await dispatch(registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })).unwrap();

      if (result.body) {
        const loginResult = await dispatch(userLogin({
          email: data.email,
          password: data.password
        })).unwrap();

        if (loginResult.body.token) {
          navigate('/user/profile');
        }
      }
    } catch (err) {
      console.error('Login failed:', err)
    }

    reset();
    setShowRegister(false);
  };

  return (
    <div className='main bg-dark'>
      <div className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        {error && <div className='error-message'>{error}</div>}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your username"
              {...register('email')}
              required
            />
            {errors.username && (
              <span className='error'>{error.username.message}</span>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register('password')}
              required
            />
            {errors.password && (
              <span className='error'>{error.password.message}</span>
            )}
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              {...register('rememberMe')}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={loading}>{loading ? 'Sign In...' : 'Sign In'}</button>
        </form>
        <p className="create-account">
          Don't have an account? <span onClick={() => setShowRegister(true)}>Create one</span>
        </p>
      </div>

      {showRegister && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
              <div className="input-wrapper">
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="Enter your first name"
                  {...registerRegister('firstName', { required: 'First name is required' })}
                />
                {errorsRegister.firstName && <span className="error">{errorsRegister.firstName.message}</span>}
              </div>
              <div className="input-wrapper">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" placeholder="Enter your last name"
                  {...registerRegister('lastName', { required: 'Last name is required' })}
                />
                {errorsRegister.lastName && <span className="error">{errorsRegister.lastName.message}</span>}
              </div>
              <div className="input-wrapper">
                <label htmlFor="email-register">Email</label>
                <input type="email" id="email-register" placeholder="Enter your email"
                  {...registerRegister('email', { required: 'Email is required' })}
                />
                {errorsRegister.email && <span className="error">{errorsRegister.email.message}</span>}
              </div>
              <div className="input-wrapper">
                <label htmlFor="password-register">Password</label>
                <input type="password" id="password-register" placeholder="Create a password"
                  {...registerRegister('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                />
                {errorsRegister.password && <span className="error">{errorsRegister.password.message}</span>}
              </div>
              <button type="submit" className="sign-in-button">Register</button>
              <button type="button" className="close-modal" onClick={() => setShowRegister(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}