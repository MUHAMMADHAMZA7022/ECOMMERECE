import React from "react";
// import gf from "../../../images/gf.gif";
import { Audio } from "react-loader-spinner";

import "./Loader.css";
const Loader = () => {
  return (
    <div className="load">
      <div>
        <Audio heigth="100px" width="100%" color="grey" ariaLabel="loading" />
      </div>
    </div>
    // <div className="loading">
    //   <div>
    //     <img src={gf} alt="Loading" />
    //   </div>
    // </div>
  );
};

export default Loader;
