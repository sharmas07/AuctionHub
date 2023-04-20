import React from 'react'
import './CSS/ProductCard.css'
import { useNavigate } from 'react-router-dom'
import imageNotAvailable from './Images/Image_not_available1.png'
function ProductCard(props) {
  const navigate = useNavigate()
  const { _id,creator, product_name, initial_price, current_price, last_bidder, image_url} = props.product
  const handleBidBtn = () =>{
    // sends user to bid product page with product id,name and current price
    navigate(`/bidproduct/${product_name}/${current_price}/${_id}`);
  }
  
  return (
    <div className='product-card'>
      <div className="product-card-left">
        <div className="product-image-container">
        <img className='product-img' src={image_url?image_url:imageNotAvailable} alt="" />
        </div>
        <div className='product-details'>
          <span className='product-detail'>Product Name: {product_name}</span>
          <span className='product-detail'>Bid Creator: {creator}</span>
          <span className='product-detail'>Bid Started With:{initial_price}</span>
        </div>
      </div>
      <div className="product-card-right">
        <div className='product-right-content'> 
          <span className="current-price">Current Price: {current_price}</span>
          <span className="current-price">Last Bidder: {last_bidder} </span>
          <button  className="bid-btn" onClick={handleBidBtn}> <span>MAKE YOUR BID</span></button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard