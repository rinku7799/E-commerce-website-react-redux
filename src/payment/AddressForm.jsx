import React, { useState } from "react";
import ProductBill from "../pages/cart-bill";
import { useSelector } from "react-redux";
import './payment.css'



const PaymentForm = ({ cities }) => {
  const [IsAddressAdded, setAddress] = useState({
    Address: "",
    city: "",
    state: "",
    pincode: "",
    flag: false
  });

  function handleSubmision(e) {
    e.preventDefault();
    setAddress((prev) => {
      return {
        ...prev,
        Address: e.target[0].value + " " + e.target[1].value,
        city: e.target[2].value,
        state: e.target[3].value,
        pincode: e.target[4].value,
        flag: true
      };
    });


  }

  const list = useSelector(state => state.cartProduct);
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center main ">
        {
          !IsAddressAdded.flag ? (
            <form
              className="row g-3 payment-form shadow rounded-3"
              onSubmit={handleSubmision}
            >
              <p className="text-center text-capitalize h2 text-secondary">
                shipping Address
              </p>
              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  City
                </label>
                <input type="text" className="form-control" id="inputCity" />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <select id="inputState" className="form-select">
                  <option>Choose...</option>
                  {cities.map((data, idx) => {
                    return <option key={idx}>{data.split(",")[1]}</option>;
                  })}
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Pincode
                </label>
                <input type="text" className="form-control" id="inputZip" />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary submitBtn mb-2 w-100">
                  submit
                </button>
              </div>
            </form>
          ) : <ProductBill list={list} routeForPay={"/add-address/payment"} text="checkout" myAddress={IsAddressAdded} />}
  
      </div>
    </>
  );
};

export default PaymentForm;