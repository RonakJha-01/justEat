import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets/frontend_assets/assets'






const Header = () => {
  return (
    <div className='header'>
      <div className="header_vid">
        <video src={assets.header_vid} autoPlay muted loop></video>
      </div>
      <div className="header-contents">
        <h2>Order your favourite food here! </h2>
        <p>"Craving Something Delicious? Order - Hot Meals, Fast Feels! From Our Kitchen to Your Doors - Just Eat!"</p>
       

      </div>
    </div>
  )
}

export default Header
