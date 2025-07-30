import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./ForgotPassword.css"

export const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you can add the logic to handle the forgot password request
    console.log('Email submitted:', email)
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Forgot Password</h2>
        <p>Enter your email address to receive a password reset OTP</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <Link to="/otp" className="change-password-btn">
            Change Password
          </Link>
        </form>
      </div>
    </div>
  )
}
