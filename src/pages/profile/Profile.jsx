import React, { useEffect } from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setTokenFromLocalStorage } from '../../redux/authSlice'
import { fetchUserProfile } from '../../redux/authAction'
import Account from '../../components/accounts/Account'


export default function Profile() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, userInfo, userToken } = useSelector((state) => state.user)

  useEffect(() => {
    if (!userToken) {
      const token = localStorage.getItem('userToken')

      if (token) {
        dispatch(setTokenFromLocalStorage(token));
      }
    } if (!userToken) {
      navigate('/user/login');
    } else {
      dispatch(fetchUserProfile())
    }
  }, [userToken, dispatch, navigate])

  return ( 
    <main className="main bg-dark">
      <div className="header">
        <h1 className='profile-title'>Welcome back<br />{loading ? 'Loading...' : (userInfo?.body?.firstName && userInfo?.body?.lastName 
    ? `${userInfo.body.firstName} ${userInfo.body.lastName}`
    : 'User')}!</h1>
        <Link className="edit-button" to='/user/updateProfile' >Edit Name</Link>
      </div>
      <div>
        <Account />
      </div>
    </main>
  )
}
