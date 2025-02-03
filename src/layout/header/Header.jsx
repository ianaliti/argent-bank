import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo/argentBankLogo.png'
import './Header.css'

export default function Header() {
  return (
    <nav className="main-nav">
    <NavLink className="main-nav-logo" to="/" >
      <img
        className="main-nav-logo-image"
        src={logo}
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </NavLink>
    <div>
      <NavLink className="main-nav-item" to="user/login">
        <FontAwesomeIcon icon={faUserCircle} className='icon-circle'/>
        Sign In
      </NavLink>
    </div>
  </nav>
  )
}
