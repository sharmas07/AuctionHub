import React, { useState } from "react";
import "../components/CSS/Register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Footer from "./Footer";
import baseURL from "../baseURL";

function Register(props) {
  const {setUserLoggedin, getUser} = props
  const [validDetails, setvalidDetails] = useState(false);
  const [resData, setresData] = useState({
    success: true,
    newEmail: true,
  });
  const [isloading, setisloading] = useState(false);
  const [newUser, setnewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // handles register user
  const onRegister = async (e) => {
    setvalidDetails(false);
    setresData({ success: true, newEmail: true });
    setisloading(true);
    const { username, email, password } = newUser;
    e.preventDefault(); 
    await axios
      .post(`${baseURL}/api/v1/signup`, {
        username,
        email,
        password,
      })
      .then(function (response) {
        if (response.data.errors) {
          setvalidDetails(true);
          return;
        }
        const { data } = response;
        if (!data.success) {
          setresData({ success: false, newEmail: false });
        }
        if(data.success){
          // set the auth-token into localStorage for authentication
          localStorage.setItem('auth-token',data.authToken)
         
          setUserLoggedin(true)
          navigate('/my-products')
          getUser()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setisloading(false);
   
  };
  return (
    <>
      <div className="container">
        <form className="form">
          <span className="title">Sign Up</span>
          <input
            onChange={(e) => {
              setnewUser({ ...newUser, username: e.target.value });
            }}
            type="text"
            className="input"
            placeholder="username"
          />
          <input
            onChange={(e) => {
              setnewUser({ ...newUser, email: e.target.value });
            }}
            type="email"
            className="input"
            placeholder="email"
          />
          {!resData.newEmail && (
            <h5 style={{ color: "red" }}>
              An Account with this email already exist
            </h5>
          )}
          <input
            onChange={(e) => {
              setnewUser({ ...newUser, password: e.target.value });
            }}
            type="password"
            className="input"
            placeholder="password"
          />
          <span className="sub">
            Already have an account ? <Link to="/login">Sign in</Link>
          </span>
          {isloading && <Spinner />}
          {validDetails && (
            <div
              style={{
                color: "red",
              }}
            >
              <p>* username must be min length of 3</p>
              <p>* enter a valid email</p>
              <p>* password must be atleast 5 characters</p>
            </div>
          )}
          <input className="register-btn" type="submit" onClick={onRegister} />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
