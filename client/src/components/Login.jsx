import axios from "axios";
import React, { useState } from "react";
import "../components/CSS/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import i from "../images/ac.png";
import baseURL from "../baseURL";

function Login(props) {
  const { setUserLoggedin, getUser } = props;
  const [loggedin, setloggedin] = useState(true);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // function to handle login of user
  const OnLogin = async (e) => {
    setloggedin(true);
    setisloading(true);
    e.preventDefault();
    await axios
      .post(`${baseURL}/api/v1/login`, {
        email,
        password,
      })
      .then(async function (response) {
        const { data } = response;
        if (data.success) {
          localStorage.setItem("auth-token", data.authToken);
          setloggedin(true);
          setUserLoggedin(true);
          getUser(); // fetch the user's name and id and takes user to their products page
          navigate("/my-products");
        } else {
          setloggedin(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    setisloading(false);
  };

  return (
    <>
      {" "}
      <div className="auth">
        <img src={i} className="loginPage-image" alt="" />
        <div className="container">
          <form className="form">
            <p className="form-title">Sign in to your account</p>
            <div className="input-container">
              <input
                className="input"
                placeholder="Email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-container">
              <input
                className="input"
                placeholder="Enter password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span></span>
            </div>
            {isloading && <Spinner />}
            <input
              className="login-btn"
              type="submit"
              onClick={OnLogin}
              value={"Login"}
            />
            {!loggedin && (
              <h4 style={{ color: "red" }}>
                login failed please enter valid credentials
              </h4>
            )}
            <p className="signup-link">
              No account?
              <Link to={"/register"}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
