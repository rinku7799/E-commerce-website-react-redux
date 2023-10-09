import React, { useEffect, useState } from "react";
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import PaymentForm from "./AddressForm";
import { useSelector } from "react-redux";

const Payment = () => {
    const citiesInIndia = [
        "Mumbai, Maharashtra",
        "Delhi, National Capital Territory of Delhi",
        "Bangalore, Karnataka",
        "Hyderabad, Telangana",
        "Chennai, Tamil Nadu",
        "Kolkata, West Bengal",
        "Pune, Maharashtra",
        "Ahmedabad, Gujarat",
        "Jaipur, Rajasthan",
        "Lucknow, Uttar Pradesh",
        "Kanpur, Uttar Pradesh",
        "Nagpur, Maharashtra",
        "Patna, Bihar",
        "Indore, Madhya Pradesh",
        "Thane, Maharashtra",
        "Bhopal, Madhya Pradesh",
        "Visakhapatnam, Andhra Pradesh",
        "Vadodara, Gujarat",
        "Coimbatore, Tamil Nadu",
        "Ludhiana, Punjab",
        "Kochi, Kerala",
        "Agra, Uttar Pradesh",
        "Madurai, Tamil Nadu",
        "Varanasi, Uttar Pradesh",
        "Meerut, Uttar Pradesh",
        "Nashik, Maharashtra",
        "Rajkot, Gujarat",
        "Srinagar, Jammu and Kashmir",
        "Amritsar, Punjab",
        "Allahabad, Uttar Pradesh",
    ];

    const list = useSelector(state => state.cartProduct);


    return (
        <>
            <Header />
            <PaymentForm cities={citiesInIndia} />
            <Footer />
        </>
    );
};

export default Payment;