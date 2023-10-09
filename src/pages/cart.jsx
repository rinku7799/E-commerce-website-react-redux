import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import Layout from "../component/layout/layout";
import ProductBill from "./cart-bill";
import { useSelector } from "react-redux";
import "./cart.css"
import AddedProduct from "./cart-product";
import ConfimationAndAlert from "../component/alertingComponent/confirmationAndAlert";
import useWindowSize from "../component/media-query/size";

const Cart = () => {
    const size = useWindowSize()
    const cartData = useSelector((state) => state.cartProduct);

    if (cartData.length === 0) {
        return (
            <>
                <ConfimationAndAlert
                    ImageInfo={{
                        url: "https://www.pngitem.com/pimgs/m/480-4803503_your-cart-is-currently-empty-empty-cart-icon.png",
                        alt: "empty cart",
                    }}
                    route={"/"}
                    message={"cart is empty"}
                    btnText={"return to shopping"}
                />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container d-flex flex-md-row flex-column" style={{ height: "auto" }}>
                <AddedProduct list={cartData} />
                <ProductBill
                    list={cartData}
                    routeForPay={"/add-address/payment"}
                    text={"Place Order"}
                />
            </div>
            <Footer />
        </>
    );
};

export default Cart;