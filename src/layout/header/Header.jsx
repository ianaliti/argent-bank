import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo/argentBankLogo.png'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { fetchUserProfile } from '../../redux/authAction';

export default function Header() {
  // Add userInfo to your useSelector
const { userToken, userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userToken) {
      dispatch(fetchUserProfile())
    }
  }, [userToken, navigate])

  const handlelLogout = () => {
    dispatch(logout())
    setTimeout(() => {
      navigate('/')
    })
  }

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/" >
        <img
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {userToken ? (
          <>
          <NavLink className="main-nav-item" to="/user/profile">
            <FontAwesomeIcon icon={faUserCircle} className="icon-circle" />
            {userInfo?.body?.firstName}
          </NavLink>
          <button className="main-nav-item"onClick={handlelLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className='icon-circle' />
            Logout
          </button>
          </>) : (
          <NavLink className="main-nav-item" to="user/login">
            <FontAwesomeIcon icon={faUserCircle} className='icon-circle' />
            Sign In
          </NavLink>
      )}
      </div>
    </nav>
  )
}
