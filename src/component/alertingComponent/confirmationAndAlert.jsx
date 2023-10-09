import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Targetbtn from '../target-buttons/targetBtn'
import "./confirmationAndAlert.css"

const ConfimationAndAlert = ({ ImageInfo, message, btnText, route }) => {
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center flex-column containerSize  align-items-center">
                <img
                    src={ImageInfo.url}
                    alt={ImageInfo.alt}
                    width={"200px"}
                />
                <p className="display-3 text-center text-capitalize">
                    {message}
                </p>
                <Targetbtn route={route} btnText={btnText} />
            </div>
            <Footer />
        </>
    );
};

export default ConfimationAndAlert