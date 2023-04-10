import React from "react";
import loading from "./Images/loading.gif";
const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{
          height: "30px",
          width: "30px",
          margin: "0",
        }}
        src={loading}
        alt="loader"
      />
    </div>
  );
};

export default Spinner;
