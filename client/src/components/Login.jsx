import axios from 'axios'
import React, { useState } from 'react'
import '../components/CSS/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import Footer from './Footer'
import i from '../images/ac.png'


function Login(props) {
  const {setUserLoggedin, getUser} = props;
  const [loggedin, setloggedin] = useState(true)
  const [isloading, setisloading] = useState(false)
  const navigate = useNavigate();
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  // function to handle login of user
  const OnLogin = async (e)=>{
    setloggedin(true)
    setisloading(true)
    e.preventDefault()
    await axios.post(`https://auction-hub.onrender.com/api/v1/login`,{
      email, password
    })
    .then(async function (response) {
      const {data} =  response;
      if(data.success){
        localStorage.setItem('auth-token',data.authToken)
        setloggedin(true)
        setUserLoggedin(true)
        getUser() // fetch the user's name and id and takes user to their products page
        navigate('/my-products');
      }else{
        setloggedin(false)
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    setisloading(false)
  }

  return (
    <> <div className="auth">
      <img src={i} className="c" alt="" />
    <div className="container">
          <form className="form">
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input placeholder="Enter email" type="email" onChange={(e)=>{setEmail(e.target.value)}} />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <div className="input-container">
          <input placeholder="Enter password" type="password" onChange={(e)=>{setPassword(e.target.value)}} />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        {isloading && <Spinner/>}
        <input className="login-btn" type="submit" onClick={OnLogin} value={'Login'}/>
        {!loggedin && <h4 style={{color:'red'}}>login failed please enter valid credentials</h4>}
        <p className="signup-link">
          No account?
          <Link to={'/register'}>Sign up</Link>
        </p>
      </form>

    </div>
</div>    <Footer/>
    </>
  )
} 

export default Login
