import React from "react";
import Helmet from "react-helmet";
const Metadata = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};
//ye title har page ka ha agr chnge krna helmat use tbhi krty different title use kr k
export default Metadata;
