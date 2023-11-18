import React, { useEffect, useState } from "react";
import "./CSS/ProductCard.css";
import { useNavigate } from "react-router-dom";
import imageNotAvailable from "./Images/Image_not_available1.png";
function ProductCard(props) {
  const navigate = useNavigate();
  let {
    _id,
    creator,
    product_name,
    initial_price,
    current_price,
    last_bidder,
    image_url,
    added_time,
    bid_time,
  } = props.product;
  const handleBidBtn = () => {
    // sends user to bid product page with product id,name and current price
    navigate(`/bidproduct/${product_name}/${current_price}/${_id}`);
  };
  const [disableBidBtn, setDisableBidBtn] = useState(false)
  const [remainingTime, setRemainingTime] = useState("");
  const [TimerTextColor, setTimerTextColor] = useState("green")

  useEffect(() => {
    // Set the date we're counting down to
    let countDownDate = new Date(added_time);

    // Extra time string in the format "01:01:20:30"
    let extraTime = bid_time;

    // Split the extra time string into its components
    if (bid_time) {
      let [days, hours, minutes, seconds] = bid_time.split(":");

      // Convert the components to milliseconds
      let extraTimeMilliseconds =
        parseInt(days) * 24 * 60 * 60 * 1000 +
        parseInt(hours) * 60 * 60 * 1000 +
        parseInt(minutes) * 60 * 1000 +
        parseInt(seconds) * 1000;

      // Add the extra time to the countDownDate
      countDownDate.setTime(countDownDate.getTime() + extraTimeMilliseconds);

      // Update the count down every 1 second
      let x = setInterval(() => {
        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Format the remaining time as a string
        let remainingTimeString =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s";
        if (parseInt(minutes) < 1 ) {
          setTimerTextColor("orange")
        }
        // Set the remaining time in the state
        setRemainingTime(`Time Left: ${remainingTimeString}`);

        // If the count down is over, clear the interval
        if (distance < 0) {
          setDisableBidBtn(true)
          clearInterval(x);
          if (last_bidder === "none") {
            setRemainingTime("Time Up No one bought");
            setTimerTextColor("red")
          } 
          else {
            setRemainingTime(`Time Up Sold out to ${last_bidder}`);
            setTimerTextColor("red")
          }
        }
      }, 1000);

      // Clean up the interval on component unmount
      return () => {
        clearInterval(x);
      };
    }
  }, []);

  return (
    <div className="product-card">
      <div className="product-card-left">
        <div className="product-image-container">
          <img
            className="product-img"
            src={image_url ? image_url : imageNotAvailable}
            alt=""
          />
        </div>
        <div className="product-details">
          <span className="product-detail">Product Name: {product_name}</span>
          <span className="product-detail">Bid Creator: {creator}</span>
          <span className="product-detail">
            Bid Started With: {initial_price}
          </span>
          <span style={{color:`${TimerTextColor}`}} className="product-detail">{remainingTime}</span>
        </div>
      </div>
      <div className="product-card-right">
        <div className="product-right-content">
          <span className="current-price">Current Price: {current_price}</span>
          <span className="current-price">Last Bidder: {last_bidder} </span>
          <button className="bid-btn" disabled={disableBidBtn} onClick={handleBidBtn}>
            {" "}
            <span>MAKE YOUR BID</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
