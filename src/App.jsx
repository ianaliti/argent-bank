import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import User from './pages/user/User'
import Layout from './layout/Layout'
import SignIn from './pages/login/Login'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="user/login" element={<SignIn />} />
        <Route path='user/profile' element={<User />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  )
}

export default App
