import React, { useState } from "react";
import Targetbtn from './targetBtn'
import {loadStripe} from "@stripe/stripe-js"
import LoadingSpinner from "../component/loader/loader";

const ProductBill = ({ list, text, routeForPay, myAddress }) => {
  let sum = 0;
  let totalQuantity = 0;

  const [isLoading, setloading] = useState(false);

  list.map((element) => {
    const productTotal = element.Quantity * element.price;
    sum += productTotal;

    totalQuantity += element.Quantity;
  });
  const floatsum = parseFloat(sum.toFixed(2));
  // discount
  const discountPercentage = 10;
  const discountAmount = (sum * discountPercentage) / 100;

  const discountedTotal = sum - discountAmount;
  const floatdiscount = parseFloat(discountedTotal.toFixed(2));
  // totalAmount
  const totalAmount = sum - discountAmount;
  const floatTotalnumber = parseFloat(totalAmount.toFixed(2));

  async function handlecheckout() {
    setloading(true);
    try {
      const stripe = await loadStripe(
        import.meta.env.VITE_FIREBASE_PUBLISH_KEY
      );
      console.log(import.meta.env.VITE_FIREBASE_PUBLISH_KEY);
        console.log(list)
      const body = {
        products: list,
        URLs: {
          success: import.meta.env.VITE_PAYMENT_URL_SUCCESSFULL,
          cancel: import.meta.env.VITE_PAYMENT_URL_CANCEL,
        }
      };
      console.log(import.meta.env.VITE_PAYMENT_URL_SUCCESSFULL);
      console.log(import.meta.env.VITE_PAYMENT_URL_CANCEL);
      const headers = {
        "Content-Type": "application/json",
        "Authorization":
          `Bearer ${import.meta.env.VITE_FIREBASE_PUBLISH_KEY}`
      };
      const response = await fetch(
        "https://new-backend-project-e-commerce-backend.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      console.log(session)

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log(result)
      setloading(false);
    } catch (err) {
      setloading(false);
      alert(err.message);
    }
  }

  return (
    <div className="main ">
      {list.length !== 0 && (
        <div className="card mt-5 main-card ">
          <div className="card-body">
            {myAddress?.flag && (
              <div>
                <p className="h5">Address</p>
                <p className="mb-3 ">{myAddress.Address}</p>
              </div>
            )}
            <div>
              <h5 className="card-title ">Price Details</h5>

              <p className="card-text disable">
                safe and secure payments.Easy returns. 100% Authentic products.
              </p>
              <div className="d-flex justify-content-between">
                <p className="card-text">Price ({totalQuantity} items)</p>
                <p className="card-text">&#x20B9;{floatsum}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="card-text">Discount</p>
                <p className="card-text">{floatdiscount}%</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="card-text">Delivery Charges</p>
                <p className="card-text text-success fw-bold">FREE Delivery</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="card-text fw-semibold fs-5">Total Amount </p>
                <p className="card-text fw-semibold fs-5">
                  &#x20B9;{floatTotalnumber}
                </p>
              </div>
            </div>
            {myAddress?.flag ? (
              <button
                className="btn btn-primary w-100 btnheight"
                onClick={handlecheckout}
              >
                {isLoading ? <LoadingSpinner /> : "checkout"}
              </button>
            ) : (
              <Targetbtn route={routeForPay} btnText={text} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBill;