import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Profile.css'
import DemoImage from "../../assets/image/person/Screenshot 2025-06-05 184902.png"

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: DemoImage,
    joinDate: "January 2024",
    bio: "Passionate about technology and innovation. Love to explore new things and share knowledge with others.",
    stats: {
      orders: 15,
      reviews: 8,
      wishlist: 12
    }
  }

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="profile-header">
        <motion.div 
          className="profile-avatar"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={userData.avatar} alt={userData.name} />
        </motion.div>
        <motion.h1 
          className="profile-name"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {userData.name}
        </motion.h1>
        <p className="profile-email">{userData.email}</p>
        <p className="profile-join-date">Member since {userData.joinDate}</p>
      </div>

      <div className="profile-stats">
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>{userData.stats.orders}</h3>
          <p>Orders</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>{userData.stats.reviews}</h3>
          <p>Reviews</p>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>{userData.stats.wishlist}</h3>
          <p>Wishlist</p>
        </motion.div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <motion.div 
        className="profile-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {activeTab === 'profile' && (
          <div className="profile-bio">
            <h2>About Me</h2>
            <p>{userData.bio}</p>
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Recent Orders</h2>
            <p>Your order history will appear here</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <p>Manage your account preferences</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
