import React from "react";
import gf from "../../../images/prod.gif";

import "./imageload.css";
const Imageloader = () => {
  return (
    <div className="imageload">
      <div>
        <img src={gf} alt="Loading" />
      </div>
    </div>
  );
};

export default Imageloader;
