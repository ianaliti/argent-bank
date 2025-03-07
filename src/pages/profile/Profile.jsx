import React, { useEffect } from 'react'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setTokenFromLocalStorage } from '../../redux/authSlice'
import { fetchUserProfile } from '../../redux/authAction'
import Account from '../../components/accounts/Account'
import UpdateProfile from '../update_profile/UpdateProfile'


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
    <main className="main bg-dark profile">
      <div className="header">
        <h1 className='profile-title'>Welcome back<br />{loading ? 'Loading...' : (userInfo?.body?.firstName && userInfo?.body?.lastName
          ? `${userInfo.body.firstName} ${userInfo.body.lastName}`
          : 'User')}!</h1>
      </div>
      <UpdateProfile />
      <div className='account-container'>
      <Account
          accountType="Argent Bank Checking"
          accountNumber="x8349"
          balance="2,082.79"
          description="Available Balance"
        />
        <Account
          accountType="Argent Bank Savings"
          accountNumber="x6712"
          balance="10,928.42"
          description="Available Balance"
        />
        <Account
          accountType="Argent Bank Credit Card"
          accountNumber="x8349"
          balance="184.30"
          description="Current Balance"
        />
      </div>
    </main>
  )
}
