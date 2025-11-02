import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <div className='footer-my-logo'>
               <img className='my-logo' src= {assets.my_logo} alt="" /> 
               <h2>just-eat</h2>
               </div>
               <p>Hii this is our different social media handels you can join us here.</p> 
               <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src= {assets.linkedin_icon} alt="" />
               </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

                </div> 
            <div className="footer-content-right">
                <h2>For Contact</h2>
                <ul>
                    <li>2001-5854-6712</li>
                    <li>justeat01@gmail.com</li>
                </ul>
                
                </div>     
        </div>
        <hr />
        <p className="footer-copyright"> Copyright 2025 © justeat.com - All Rights Reserved. </p>

       
      
    </div>
  )
}

export default Footer
