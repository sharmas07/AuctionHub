import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/products.css";
import Spinner from "./Spinner";
import ProductCard from "./ProductCard";
import baseURL from "../baseURL";
import BidHistoryModal from "./BidHistoryModal";

function Products({ socket }) {
  const [Products, setProducts] = useState([]);

  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    setisloading(true);
    // fetches all the products of all users
    axios.get(`${baseURL}/api/v1/fetchAllProducts`).then((response) => {
      const { data } = response;
      data.reverse();
      setProducts(data);
      setisloading(false);
    });
    // refresh on fetching data from server's socket event
    socket.on("newProductAdded", (data) => {
      axios.get(`${baseURL}/api/v1/fetchAllProducts`).then((response) => {
        const { data } = response;
        data.reverse(); // to show the latest products on top of the page
        setProducts(data);
      });
    });
    // fetches the data on socket broadcasted fetchData event
    socket.on("fetchData", (data) => {
      axios.get(`${baseURL}/api/v1/fetchAllProducts`).then((response) => {
        const { data } = response;
        data.reverse(); // to show the latest products on top of the page
        setProducts(data);
      });
    });
  }, [socket]);


  // stuff related to bid history
  const [productHistoryId, setProductHistoryId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productBidHistory, setProductBidHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  useEffect(() => {
    setProductBidHistory([]);
    setIsHistoryLoading(true);
    const getProductHistoryById = async ()=>{
      const {data} = await axios.get(`${baseURL}/api/v1/bidHistory/get/${productHistoryId}`);
      console.log("at line 67 in product comp");
      console.log(data.History);
      setIsHistoryLoading(false)
      setProductBidHistory(data.History)
    }
    if(productHistoryId){
      getProductHistoryById(productHistoryId)
    }
  }, [productHistoryId])
  

  return (
    <>
      <div className="products-container">
        
          {isloading && <Spinner />}

          {Products &&                                                                                                            
            Products.map((product) => {
              return <ProductCard setProductHistoryId={setProductHistoryId} key={product._id} product={product} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />;
            })}
         <BidHistoryModal Products={Products} isHistoryLoading={isHistoryLoading} productBidHistory={productBidHistory} setIsDialogOpen={setIsDialogOpen} isDialogOpen={isDialogOpen} productHistoryId={productHistoryId}  />
      </div>
    </>
  );
}

export default Products;
