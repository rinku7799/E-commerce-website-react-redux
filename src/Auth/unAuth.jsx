import React from "react";
import ConfimationAndAlert from '../component/alertingComponent/confirmationAndAlert'
const Unauth = () => {
  return (
    <>
      <ConfimationAndAlert
        ImageInfo={{
          url: "https://img.freepik.com/free-vector/401-error-unauthorized-concept-illustration_114360-1934.jpg",
          alt: "unAuthrize",
        }}
        message={"Unauthrize route"}
        route={'/login'}
        btnText={"login"}
      />
    </>
  );
};

export default Unauth;