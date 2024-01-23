import React, { useEffect, useState } from "react";
import "./CSS/ProductCard.css";
import { useNavigate } from "react-router-dom";
import imageNotAvailable from "./Images/Image_not_available1.png";
import soldout from "../assets/soldout.mp3"
function ProductCard(props) {
  let {setProductHistoryId, setIsDialogOpen, isDialogOpen} = props;
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
        setRemainingTime(`${remainingTimeString} left`);

        // If the count down is over, clear the interval
        if (distance < 0) {
          setDisableBidBtn(true)
          clearInterval(x);
          if (last_bidder === "none") {
            setRemainingTime("Time Up");
            setTimerTextColor("red")
            
          } 
          else {
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

  const handleBidHistoryClick = async ()=>{
    console.log("bid history btn clicked!")
    const modal = document.querySelector(".bidHistoryModal");
    console.log(modal);
    modal.style.left = "10px";
    console.log(" handleBidHistoryClick got fired");
    setProductHistoryId(_id);
    setIsDialogOpen(!isDialogOpen);
  }
  return (
    <>

    <div className="product__card__container">
      <div className="inner-container">

	  <img
          width="300px"
          height="210"
          className="product-card-image"
          src={image_url ? image_url : imageNotAvailable}
          alt=""
        />
        <div className="product-details-container">
          <h3>Product Name: {product_name}</h3>
          <p>seller: {creator}</p>
          <h4>started with: {initial_price}</h4>
          <div className="timer-container">
            <h4>last bidder: {last_bidder}</h4>
            <span className="timer-text" style={{color:`${TimerTextColor}`}}>{remainingTime}</span>
          </div>
          <h6 onClick={()=>handleBidHistoryClick()} className="bid-history">bid History</h6>
        </div>
        <div className="product-price-bidbtn-container">
          <h4>current price: {current_price}</h4>
          <button className="bidding-btn" disabled={disableBidBtn} onClick={handleBidBtn}>Bid</button>
        </div>
      </div>
    </div>

    </>
  );
}

export default ProductCard;
