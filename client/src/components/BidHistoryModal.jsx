import React, { useEffect, useState } from "react";
import "./CSS/BidHistoryModal.css";
import loader from "./Images/loading.gif";

const BidHistoryModal = (props) => {
  let {
    isDialogOpen,
    setIsDialogOpen,
    productHistoryId,
    productBidHistory,
    isHistoryLoading,
    Products,
  } = props;

  const [productName, setProductName] = useState("");

  const findProductNameById = (_id) => {
    return Products.find((item) => item._id === _id);
  };
  useEffect(() => {
    let productName = findProductNameById(productHistoryId)?.product_name;
    setProductName(productName);
  }, [productHistoryId]);

  const handleDialogClose = () => {
    const modal = document.querySelector(".bidHistoryModal");
    modal.style.left = "-400px";
    // setIsDialogOpen(!isDialogOpen)
  };
  return (
    <>
      <dialog className="dialog bidHistoryModal" open={true}>
       {!isHistoryLoading && (
            <h2 className="bidHistoryTitle">Bid History of {productName}</h2>
          )}
        <div className="dialog-container">
          {isHistoryLoading ? (
            <img className="bid-history-loader-img" src={loader} alt="" />
          ) : (
            <div>
              {productBidHistory &&
                productBidHistory.map((item, index) => {
                  return (
                    <ul key={index}>
                      <li>
                        <div className="HistoryItem" >
                          <h4>{item.Bidder}</h4>
                          <p>${item.Amount}</p>
                          <span>
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </li>
                    </ul>
                  );
                })}
            </div>
          )}
        </div>
        <button className="bidHistory-close-btn" onClick={handleDialogClose}>
          close
        </button>
      </dialog>
    </>
    // </div>
  );
};

export default BidHistoryModal;
