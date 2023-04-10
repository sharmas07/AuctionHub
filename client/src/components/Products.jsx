import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CSS/products.css'
import Spinner from "./Spinner";

import ProductCard from './ProductCard';
function Products({socket}) {
  const [Products, setProducts] = useState([])
  
  const [isloading, setisloading] = useState(false);
  
  useEffect(() => {
    setisloading(true);
    // fetches all the products of all users
    axios.get('http://localhost:8080/api/v1/fetchAllProducts')
    .then(response=>{
      const {data} = response;
      data.reverse();
      setProducts(data)
      setisloading(false);
    })
    // refresh on fetching data from server's socket event
    socket.on('newProductAdded',(data)=>{
      axios.get('http://localhost:8080/api/v1/fetchAllProducts')
      .then(response=>{
        const {data} = response;
        data.reverse(); // to show the latest products on top of the page
        setProducts(data)
      })
    })
  },[socket])
  
  return (
    <div className="products-container">
      {isloading && <Spinner />}
       {Products && Products.map((product)=>{
      return <ProductCard key={product._id} product={product}/>
      })}
    </div>
  )
}

export default Products