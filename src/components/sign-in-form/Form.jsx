import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import './Form.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/authAction';
import { faEarthAmerica } from '@fortawesome/free-solid-svg-icons';

export default function Form() {
    const { loading, error, userToken } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors} } = useForm()

    useEffect(() => {
        if(userToken) {
            navigate("/user/profile")
        }
    }, [userToken, navigate]);

    const onSubmitForm = async (data) => {
        try {
            await dispatch(userLogin({
                email: data.email,
                password: data.password
            })).unwrap();

            navigate('/user/profile')

        } catch (err) {
            console.error('Login failed:', err)
        }
    };

    return (
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
                        { ...register('rememberMe')}
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>  
                    <button type="submit" className="sign-in-button" disabled={loading}>{ loading ? 'Sign In...' : 'Sign In'}</button>
            </form>
        </div>
    )
}
