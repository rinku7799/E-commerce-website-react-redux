import Header from "../component/header/header";
import Footer from "../component/footer/footer";
// import Layout from "../component/layout/layout";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { selectProduct } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { addToCart } from "../redux/action";
import useWindowSize from "../component/media-query/size";
import './product-detail.css'

const Productdetail = () => {
    const { id } = useParams();
    const storeData = useSelector((state) => state);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const fetchsingleProductData = async () => {
        const response = await Axios.get(import.meta.env.VITE_PRODUCT_LIST_API + id);
        dispatch(selectProduct(response.data));
    };

    const size = useWindowSize();
    console.log(size);

    useEffect(() => {
        fetchsingleProductData();
    }, [id]);

    function addTocart() {
        if (storeData.isUserLoggedIn.islogin) {
            // localStorage.setItem("cartData",JSON.stringify([]));
            let flag = false;
            const findEmail = JSON.parse(
                sessionStorage.getItem(window.sessionStorage.key(0))
            )?.email;

            let Arry = JSON.parse(localStorage.getItem(findEmail));

            let data = Arry.cart.map((x) => {
                if (x.id == storeData.selectedProduct.id) {
                    x.Quantity += 1;
                    flag = true;
                    return x;
                }
                return x;
            });

            if (!flag) {
                data.push({ ...storeData.selectedProduct, Quantity: 1 });
            }

            Arry = { ...Arry, cart: [...data] };
            localStorage.setItem(`${findEmail}`, JSON.stringify(Arry));
            dispatch(addToCart(data));
            Navigate("/cart");
        } else {
            Navigate("/login");
        }
    }

    return (
        <>
            <Header />
            <div className="container  d-flex align-items-center justify-content-center detail-container">
                {storeData.selectedProduct.length === 0 ? (
                    <h3>loading...</h3>
                ) : (
                    <div
                        className="card shadow"
                        style={{
                            maxWidth: "700px",
                            border: "none ! important",
                            height: size.width > 700 ? "80vh" : "auto",
                        }}
                    >
                        <div className="row d-flex align-items-center justify-content-center g-0 h-100 ">
                            <div className="col-md-6 text-center">
                                {size.width > 700 ? (
                                    <>
                                        <img
                                            src={storeData.selectedProduct.image}
                                            className="img-fluid rounded-start "
                                            alt="product-image"
                                        />
                                    </>
                                ) : (
                                    <img
                                        src={storeData.selectedProduct.image}
                                        className="rounded-start object-fir-cover"
                                        alt="product-image"
                                        height={"300px"}
                                        width={"300px"}
                                    />
                                )}
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h6 className="card-title">
                                        {storeData.selectedProduct.title}
                                    </h6>
                                    <h3 className="card-subtitle mb-2 text-body-secondary">
                                        Price:{" "}
                                        <span className="">
                                            &#x20B9;{storeData.selectedProduct.price}{" "}
                                        </span>
                                    </h3>
                                    <p className="card-text">
                                        {storeData.selectedProduct.description}
                                    </p>
                                    <p className="card-text">
                                        <button
                                            className="btn btn-warning text-light fw-bold"
                                            onClick={addTocart}
                                        >
                                            <GiShoppingCart style={{ fontSize: "1.5rem" }} />
                                            Add to cart
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Productdetail;