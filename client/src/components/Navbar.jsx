import React, { useEffect } from 'react'
import './CSS/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from './Images/logo.png'
import userPic from './Images/userp.png'
import hamburger from './Images/hamburger-btn.png'

function Navbar(props) { // handles logout: clears auth-token from localStorage and redirects to home'/'
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
    localStorage.removeItem('user-id');
    setUserLoggedin(false)
    navigate('/')
  }
  
  const {handleHamburger, setUserLoggedin, UserLoggedin, Username, scrolledOver} = props;
  useEffect(() => {
    console.log(scrolledOver)
  }, [scrolledOver])
  
  return (
    <div className={`nav-container ${scrolledOver?'nav-fixed':''}`}>
      <div className="logo-container">
        <Link to={'/'}><img src={logo} alt="logo" className="logo" /></Link>
      </div>
      <div className="nav-right">
        <div className="nav-right-left">
          <ul >
            {! UserLoggedin && <Link className='nav-li nav-btn-text' to={'/'}>Home</Link>}
            {!UserLoggedin && <Link className="nav-li nav-btn-text" to={"/register"}>
             Sign Up
            </Link>}
            <Link className='nav-li nav-btn-text' to={'/explore'}>Explore</Link>
            {UserLoggedin && <Link className='nav-li nav-btn-text' to={'/my-products'}>My Products</Link>}
          </ul>
        </div>
        {UserLoggedin && <div className="nav-right-right">
          <img src={userPic} alt="user" className="user-profile" />
          <span className='username-txt'>{Username}</span>
          <span className='logout-btn' onClick={handleLogout}>Log out</span>
        </div>
        }
      </div>
      <div className='hamburger'>
      <img onClick={handleHamburger} style={{width:'35px'}} src={hamburger} alt="hamburger" />
      </div>
    </div>
  )
}

export default Navbar