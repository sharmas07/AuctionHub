import React from 'react'
import './CSS/LandingPage.css'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <div>
       <div className="landing-page">
        <div className='landing-page-content'>
            <div className="landingpage-text-content">
                Revolutionize the Way You Bid and Sell with Our Auction Hub.
                </div>
                <div className="landingpage-btns">
                    <Link className='landingpage-btn-link' to={'/register'}><span className="landingpage-btn">SIGN UP</span></Link>
                    <Link className='landingpage-btn-link' to={'/explore'}><span className="landingpage-btn">EXPLORE</span></Link>
                </div>
            </div>
        </div> 
        <Footer />
    </div>
  )
}

export default LandingPage