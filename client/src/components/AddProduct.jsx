import React, { useEffect, useState } from "react";
import "./CSS/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct({socket}) {
  const navigate = useNavigate()
  const [negetiveBidPrice, setnegetiveBidPrice] = useState(false);
  const [isEmptyInput, setisEmptyInput] = useState(false);
  const [newProduct, setnewProduct] = useState({
    product_name: "",
    initial_price: "0",
    current_price:'',
    last_bidder:'none'
  });
  const handleBidPrice = (e) => {
    if (e.target.value < 0) {
      setnegetiveBidPrice(true);
    } else {
      setnegetiveBidPrice(false);
      setnewProduct({ ...newProduct, initial_price: e.target.value, current_price:e.target.value });
    }
  };
  // post a new product to the db using username and userid
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if(newProduct.product_name === ''){
      setisEmptyInput(true)
    }
    else{
      setisEmptyInput(false)
      // checks if auth token is present and add the product 
      newProduct.creator = localStorage.getItem('username')
      newProduct.userid = localStorage.getItem('user-id')
      if (localStorage.getItem('auth-token')) {
          await axios.post('https://auction-hub.onrender.com/api/v1/addproduct',newProduct)
        .then((response)=>{
          navigate('/my-products')
        })
        .catch((error)=>{
          console.log(error);
        })
      }
      else{
        navigate('/login')
      }
    }
  };
  // socket 

  return (
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
            <p style={{ color: "red",marginLeft:'6px',marginTop:'4px' }}>This field cannot be empty</p>
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
        <button className="register-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
