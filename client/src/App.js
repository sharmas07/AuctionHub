import "./App.css";
import close from "../src/components/Images/close.png";
import userpic from "../src/components/Images/userp.png";
import ProductCard from "./components/ProductCard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
import BidProduct from "./components/BidProduct";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Products from "./components/Products";
import { useState } from "react";
import LandingPage from "./components/LandingPage";
import UserProducts from "./components/UserProducts";
import axios from "axios";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");
function App() {
  const [Username, setUsername] = useState("");
  const [UserLoggedin, setUserLoggedin] = useState(false);
  const [hamvar, setHamvar] = useState(false);
  const handleHamburger = () => {
    setHamvar(!hamvar);
  };

  const getUser = async () => {
    if (localStorage.getItem("auth-token")) {
      await axios
        .get("http://localhost:8080/api/v1/getuser", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        })
        .then((response) => {
          const { username, _id } = response.data;
          localStorage.setItem("username", username);
          localStorage.setItem("user-id", _id);
          setUsername(username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          handleHamburger={handleHamburger}
          UserLoggedin={UserLoggedin}
          setUserLoggedin={setUserLoggedin}
          Username={Username}
          getUser={getUser}
        />
        <section className="main-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/productcard"
              element={<ProductCard socket={socket} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  UserLoggedin={UserLoggedin}
                  getUser={getUser}
                  setUserLoggedin={setUserLoggedin}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  getUser={getUser}
                  UserLoggedin={UserLoggedin}
                  setUserLoggedin={setUserLoggedin}
                />
              }
            />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route
              path="/bidproduct/:product_name/:current_price/:_id"
              element={<BidProduct socket={socket} />}
            />
            <Route path="/explore" element={<Products socket={socket} />} />
            <Route
              path="/my-products"
              element={<UserProducts socket={socket} getUser={getUser} />}
            />
          </Routes>
        </section>
        <div
          className="sidebar"
          style={{ display: `${hamvar ? "block" : "none"}` }}
        >
          <div className="sidebar-top">
            <img
              onClick={handleHamburger}
              className="hamburger"
              src={close}
              alt="ham"
            />
          </div>
          <div className="sidebar-content">
            <ul className="sidebar-ul">
              {!UserLoggedin &&  <li>
                <Link to={"/register"} onClick={handleHamburger} className="sidebar-link">
                  Sign Up
                </Link>
              </li>}
              {UserLoggedin && <div
                style={{
                  display: "flex",
                  margin: "1rem",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "40px", borderRadius: "50%" }}
                  src={userpic}
                  alt=""
                />
                <h3 style={{ color: "white", marginLeft: "1rem" }}>
                  {localStorage.getItem("username")}
                </h3>
              </div>}
              <li>
                <Link  onClick={handleHamburger} to={"/"} className="sidebar-link">
                  Home
                </Link>
              </li>
              <li>
                <Link  onClick={handleHamburger} to={"/explore"} className="sidebar-link">
                  Explore
                </Link>
              </li>
              {UserLoggedin && (
                <>
                  <li>
                    <Link  onClick={handleHamburger} to={"/my-products"} className="sidebar-link">
                      My Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        localStorage.removeItem("auth-token");
                        setUserLoggedin(false)
                        setHamvar(!hamvar);
                      }}
                      to={"/"}
                      className="sidebar-link"
                    >
                      Log Out
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
