import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CSS/Userproducts.css'
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
const UserProducts = (props) => {
    const navigate = useNavigate();
    const {socket} = props
    const [Products, setProducts] = useState([])
    const [isloading, setisloading] = useState(false);
     useEffect(() => {
        setisloading(true);
        // fetch user specific products using auth token
        if(localStorage.getItem('auth-token')){
          axios.get('http://localhost:8080/api/v1/fetchAllUserProducts',{
          headers:{
              "auth-token": localStorage.getItem('auth-token')
          }
        })
        .then(response=>{
          // emits product added event which fires the fetchData event and broadcast
          socket.emit('productAdded')
          const {data} = response;
          data.reverse();
          setProducts(data)
          setisloading(false);
        })
        }
        else{
          // if auth-token not found i.e no user logged in redirects to login page
          navigate('/login')
        }
          
      socket.on('fetchData',()=>{
        axios.get('http://localhost:8080/api/v1/fetchAllUserProducts',{
          headers:{
              "auth-token": localStorage.getItem('auth-token')
          }
        })
        .then(response=>{
          socket.emit('productAdded')
          const {data} = response;
          data.reverse();
          setProducts(data)
          setisloading(false);
        })
      })  
      // eslint-disable-next-line
      },[socket])
        
    return (
      <>
      <div className="products-container">
        {isloading && <Spinner />}
         {Products && Products.map((product)=>{
        return <ProductCard key={product._id} product={product}/>
        })}
        <div className='add-product-btn-container'>
          <Link to={'/addproduct'}>
          <button className='add-product-btn'><span>
          <p  style={{fontSize:'20px'}}>Add Product <span>+</span></p>
            
          </span>
          </button>
          </Link>
        </div>
      </div>
      </>
    )
}

export default UserProducts
