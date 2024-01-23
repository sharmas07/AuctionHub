import React, { useState } from "react";
import "./CSS/AddProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import baseURL from "../baseURL";

function AddProduct({ socket }) {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timeString, setTimeString] = useState("");

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const handleSecondsChange = (event) => {
    setSeconds(event.target.value);
  };

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [negetiveBidPrice, setnegetiveBidPrice] = useState(false);
  const [isEmptyInput, setisEmptyInput] = useState(false);
  const [newProduct, setnewProduct] = useState({
    product_name: "",
    initial_price: "0",
    current_price: "",
    last_bidder: "none",
  });
  const [image, setImage] = useState(null);
  const handleBidPrice = (e) => {
    if (e.target.value < 0) {
      setnegetiveBidPrice(true);
    } else {
      setnegetiveBidPrice(false);
      setnewProduct({
        ...newProduct,
        initial_price: e.target.value,
        current_price: e.target.value,
      });
    }
  };
  // post a new product to the db using username and userid
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setisLoading(true);
    // Bid time validation
    // Validate time values
    if (days === "" || hours === "" || minutes === "" || seconds === "") {
      console.log("Please fill in all fields.");
      return;
    }

    // Check if time values are valid
    const isValidTime =
      /^[0-9]+$/.test(days) &&
      /^[0-9]+$/.test(hours) &&
      /^[0-9]+$/.test(minutes) &&
      /^[0-9]+$/.test(seconds);

    if (!isValidTime) {
      console.log("Invalid time format. Please enter numeric values.");
      return;
    }

    // Convert time values to numbers
    const daysNum = parseInt(days, 10);
    const hoursNum = parseInt(hours, 10);
    const minutesNum = parseInt(minutes, 10);
    const secondsNum = parseInt(seconds, 10);

    // Validate time range
    if (
      daysNum < 0 ||
      daysNum > 30 ||
      hoursNum < 0 ||
      hoursNum > 23 ||
      minutesNum < 0 ||
      minutesNum > 59 ||
      secondsNum < 0 ||
      secondsNum > 59
    ) {
      console.log("Invalid time range. Please enter valid values.");
      return;
    }

    // Concatenate time components into desired format
    const bid_time = `${days}:${hours}:${minutes}:${seconds}`;
    setTimeString(bid_time);

    console.log(bid_time);

    if (newProduct.product_name === "") {
      setisEmptyInput(true);
    } else {
      //Get current date/time as added_time
      const current_added_time = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const added_time = formatter.format(current_added_time);
      console.log(added_time);
      setisEmptyInput(false);
      // checks if auth token is present and add the product
      newProduct.creator = localStorage.getItem("username");
      newProduct.userid = localStorage.getItem("user-id");
      const formData = new FormData();
      formData.append("bid_time", bid_time);
      formData.append("added_time", added_time);
      formData.append("product_name", newProduct.product_name);
      formData.append("initial_price", newProduct.initial_price);
      formData.append("current_price", newProduct.current_price);
      formData.append("last_bidder", newProduct.last_bidder);
      formData.append("creator", newProduct.creator);
      formData.append("userid", newProduct.userid);
      formData.append("image", image);
      if (localStorage.getItem("auth-token")) {
        await axios
          .post(`${baseURL}/api/v1/addproduct`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response);
            // save into history
            const InitialProductBidHistory = {
              Bidder: response.data.creator,
              Amount: response.data.initial_price,
              timestamp: new Date(),
            };
            axios.post(`${baseURL}/api/v1/bidHistory/post/${response.data._id}`, InitialProductBidHistory)
              .then((response) => console.log(response));
            setisLoading(false);
            navigate("/my-products");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setisLoading(false);
        navigate("/login");
      }
    }
  };
  // socket

  return (
    <>
      <div className="container">
        <form className="form" encType="multipart/form-data">
          <span className="title">Add Your Product</span>
          <div>
            <input
              required
              onChange={(e) => {
                setnewProduct({ ...newProduct, product_name: e.target.value });
              }}
              type="text"
              className="input"
              placeholder="Product Name"
            />
            {isEmptyInput ? (
              <p style={{ color: "red", marginLeft: "6px", marginTop: "4px" }}>
                This field cannot be empty
              </p>
            ) : (
              ""
            )}
          </div>
          <input
            required
            onChange={handleBidPrice}
            value={newProduct.initial_price}
            type="number"
            className="input"
            placeholder="BidPrice"
          />
          {negetiveBidPrice ? (
            <p style={{ color: "red" }}>price cannot be negetive</p>
          ) : (
            ""
          )}
          <input
            required
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            className="input"
          />

          {/* TODO: ADD TIME TO SOLD OUT */}
          <div className="time-input-container">
            <label>
              <p className="time-label">Days</p>
              <input
                type="text"
                value={days}
                onChange={handleDaysChange}
                maxLength={"2"}
                className="time-input"
              />
            </label>

            <span className="separator">:</span>

            <label>
              <p className="time-label">Hours</p>
              <input
                type="text"
                value={hours}
                onChange={handleHoursChange}
                maxLength={"2"}
                className="time-input"
              />
            </label>

            <span className="separator">:</span>

            <label>
              <p className="time-label">Minutes</p>
              <input
                type="text"
                value={minutes}
                onChange={handleMinutesChange}
                maxLength={"2"}
                className="time-input"
              />
            </label>

            <span className="separator">:</span>

            <label>
              <p className="time-label">Seconds</p>
              <input
                type="text"
                value={seconds}
                onChange={handleSecondsChange}
                maxLength={"2"}
                className="time-input"
              />
            </label>
          </div>
          {isLoading && <Spinner />}
          <button className="add-product-btn" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
