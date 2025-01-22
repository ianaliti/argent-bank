import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './User.css'

export default function User() {
  return (
    <main className="main bg-dark">
    <div className="header">
      <h1>Welcome back<br />Tony Jarvis!</h1>
      <button className="edit-button">Edit Name</button>
    </div>
  </main>
  )
}
