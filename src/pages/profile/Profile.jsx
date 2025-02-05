import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/authSlice'
import { fetchUserProfile } from '../../redux/authAction'

export default function Profile() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, userInfo, userToken } = useSelector((state) => state.user)

  useEffect(() => {
    if(!userToken) {
      navigate('/user/login')
    } else {
      dispatch(fetchUserProfile())
    }
  }, [userToken, dispatch, navigate])

  const handlelLogout = () => {
    dispatch(logout())
    navigate('/user/login')
  }

  console.log(userInfo?.body?.firstName) 

  return (
    <main className="main bg-dark">
    <div className="header">
    <h1>Welcome back<br />{loading ? 'Loading...' : userInfo?.body?.firstName || 'User'}!</h1>
      <button className="edit-button">Edit Name</button>
      <button className="edit-button" onClick={handlelLogout}>Logout</button>
    </div>
  </main>
  )
}
