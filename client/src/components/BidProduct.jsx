import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import baseURL from '../baseURL';
import axios from 'axios';

function BidProduct({socket}) {
  const navigate = useNavigate()
  // destructure's product details from url
  const { product_name, current_price, _id } = useParams();
  const [biddedPrice, setBiddedPrice] = useState();
  const [error,setError] = useState(false)

  //  handles onsubmit and emits an bid product event
  const handleOnsubmit = async (e)=>{
    e.preventDefault();
    // con bid only if any user loggedin, i.e login required
    if(localStorage.getItem('auth-token')){
      if (biddedPrice > Number(current_price)) {
        socket.emit('bidproduct', {
          biddedPrice,
          last_bidder: localStorage.getItem('username'),
          _id,
        });
        // save history after succesful bid
        const newBidHistory = {
          Bidder: localStorage.getItem('username'),
          Amount: biddedPrice,
          timestamp: new Date()
        }
        const bidHistory = await axios.post(`${baseURL}/api/v1/bidHistory/post/${_id}`, newBidHistory);
        console.log(bidHistory);
        // send user to explore page after a succesful bid
        navigate('/explore'); 
      } else {
        setError(true);
      }
    }
    else{
      // sends user to login page if not logged in i.e no auth token present
      navigate('/login')
    }
  }
  return (
    <div className="container">
      <form className="form">
        <div>
          <h3> Product Name : {product_name}</h3>
          <h3 style={{marginTop:'1rem'}}> Current Price : {current_price}</h3>
        </div>
        <input onChange={(e)=>{setBiddedPrice(e.target.value)}} type="number" className="input" placeholder="Bid Your Price" />
        {error && <p style={{color:'red'}}>Bidding price must be greater than <span style={{color:'green'}}>{current_price}</span> </p>}
        <button onClick={handleOnsubmit} className="register-btn">Make Bid</button>
      </form>
      </div>
  )
}

export default BidProduct