
import React from "react";
import { useDispatch } from "react-redux";
import {
    increaseItem,
    decreaseItem,
    removeCartItem,
} from "../redux/action"
import './cart-product.css'

const AddedProduct = ({ list }) => {
    const dispatch = useDispatch();
    const findEmail = JSON.parse(
        sessionStorage.getItem(window.sessionStorage.key(0))
    )?.email;
    function incrementItem(productId) {
        let arryOfIncrement = JSON.parse(localStorage.getItem(findEmail));
        const updatedData = arryOfIncrement.cart.map((element) => {
            if (element.id === parseFloat(productId)) {
                return { ...element, Quantity: element.Quantity + 1 };
            }
            return element;
        });

        arryOfIncrement = { ...arryOfIncrement, cart: [...updatedData] };

        localStorage.setItem(findEmail, JSON.stringify(arryOfIncrement));
        dispatch(increaseItem(updatedData));
    }

    function decreamentItem(id) {
        let arryOfDecrement = JSON.parse(localStorage.getItem(findEmail));
        const updatedData = arryOfDecrement.cart.map((element) => {
            if (element.id === parseFloat(id)) {
                return { ...element, Quantity: element.Quantity - 1 };
            }
            return element;
        });

        arryOfDecrement = { ...arryOfDecrement, cart: [...updatedData] };
        localStorage.setItem(findEmail, JSON.stringify(arryOfDecrement));
        dispatch(decreaseItem(updatedData));
    }

    function removeItemFromCart(id) {
        let arryOfRemove = JSON.parse(localStorage.getItem(findEmail));
        const updatedData = arryOfRemove.cart.filter(
            (element) => element.id !== parseFloat(id)
        );
        arryOfRemove = { ...arryOfRemove, cart: [...updatedData] };
        localStorage.setItem(findEmail, JSON.stringify(arryOfRemove));
        dispatch(removeCartItem(updatedData));
    }

    return (
        <div className="container product-conatiner d-flex flex-column w-sm-50 w-100 mt-4" >
            {list.map((element) => (
                <div className="card  my-3" style={{ Width: "200px" }} >
                    <div className="row d-flex flex-md-row flex-column g-0">
                        <div className="col-md-3">
                            <img
                                src={element.image}
                                className="rounded-start"
                                alt="..."
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                <h3 className="card-subtitle mb-2 text-body-secondary">
                                    Price: <span className="">&#x20B9;{element.price} </span>
                                </h3>
                                <p className="cart-text btn-group btn-group-sm">
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark"
                                        id={element.id}
                                        onClick={(e) => {
                                            decreamentItem(e.target.id);
                                        }}
                                        disabled={element.Quantity === 1 ? true : false}
                                    >
                                        -
                                    </button>
                                    <button type="button" className="btn btn-outline-dark">
                                        {element.Quantity}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark"
                                        id={element.id}
                                        onClick={(e) => {
                                            incrementItem(e.target.id);
                                        }}
                                    >
                                        +
                                    </button>
                                </p>
                                <p className="card-text">
                                    <button
                                        type="button"
                                        id={element.id}
                                        className="btn btn-danger"
                                        onClick={(e) => {
                                            removeItemFromCart(e.target.id);
                                        }}
                                    >
                                        Remove Item
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddedProduct;