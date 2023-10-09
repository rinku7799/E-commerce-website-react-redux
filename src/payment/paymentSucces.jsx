import React, { useEffect } from "react";
import ConfimationAndAlert from '../component/alertingComponent/confirmationAndAlert'
import { useSelector } from "react-redux";

const PaymentSuccess = () => {
    const getemail = useSelector((state) => state.isUserLoggedIn.email);
    
    useEffect(() => {
        let userdata = JSON.parse(localStorage.getItem(getemail));
        userdata = { ...userdata, cart: [] };
        localStorage.setItem(getemail, JSON.stringify(userdata));
    }, [getemail]);

    return (
        <ConfimationAndAlert
            ImageInfo={{
                url: "https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png",
                alt: "success",
            }}
            message={"payment successfull"}
            route={"/"}
            btnText={"return more shooping"}
            
        />
    );
};

export default PaymentSuccess;