import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Layout from './layout/Layout'
import Login from './pages/login/Login'
import UpdateProfile from './pages/update_profile/UpdateProfile'
import Transaction from './pages/transaction/Transaction'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user/login" element={<Login />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
  )
}

export default App
