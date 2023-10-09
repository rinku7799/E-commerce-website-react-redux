import Login from "./Auth/login";
import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import Register from "./Auth/register";
import Cart from "./pages/cart";
import Productlist from "./pages/productlist";
import Productdetail from "./pages/product-detail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authChecking } from "./redux/action";
import Forgotpassword from "./Auth/forgot";
import Payment from "./payment/payment";
import Unauth from "./Auth/unAuth";
import PaymentSuccess from "./payment/paymentSucces";
import "./App.css";

function App() {
  const checkflag = useSelector((state) => state.isUserLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(
      sessionStorage.getItem(window.sessionStorage.key(0))
    );
    if (token) {
      dispatch(
        authChecking({
          email: token.email,
          flag: true,
        })
      );
    }
  }, []);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Productlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            checkflag.islogin === false ? (
              <Unauth />
            ) : (
              <Cart />
            )
          }
        />
        <Route path="/product/detail/:id" element={<Productdetail />} />
        <Route path="/forgot/password" element={<Forgotpassword />} />
        <Route path="*" element={<h1>page is not found</h1>} />
        <Route path="/add-address/payment" element={<Payment />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Routes>
    </>
  )
}

export default App;


