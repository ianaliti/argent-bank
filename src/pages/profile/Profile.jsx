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


  console.log(userInfo?.body?.firstName)

  return ( 
    <main className="main bg-dark profile">
      <div className="header">
        <h1>Welcome back<br />{loading ? 'Loading...' : userInfo?.body?.firstName || 'User'}!</h1>
        <Link className="edit-button" to='/user/updateProfile' >Edit Name</Link>
      </div>
      <div>
        <Account />
      </div>
    </main>
  )
}
