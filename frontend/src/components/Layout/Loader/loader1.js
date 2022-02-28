import React from "react";
import "../../Home/Home.css";
import { Fragment } from "react";
// import { Audio } from "react-loader-spinner";
import "react-loading-skeleton/dist/skeleton.css";
import gf from "../../../images/prod.gif";

import "./Loader.css";
const loader1 = () => {
  return (
    <Fragment>
      <div className="productload">
        <>
          <div>
            <img src={gf} alt="" />
          </div>
        </>
      </div>
      {/* <SkeletonTheme>
        <section>
          <Skeleton height={300} width={193} className="productload" src={gf}>
            {" "}
            <img src={gf} alt="" />
          </Skeleton>
        </section>
      </SkeletonTheme> */}
    </Fragment>
  );
};

export default loader1;
