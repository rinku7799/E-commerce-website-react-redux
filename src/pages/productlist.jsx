
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
// import Layout from "../component/layout/layout";
import { useEffect } from "react";
import { setProduct, removeProduct, authChecking } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import './productlist.css'
import { Link } from "react-router-dom";
import LoadingSpinner from "../component/loader/loader";

const ProductList = () => {
    //take state from store
    const productData = useSelector((state) => state.Allproduct);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_PRODUCT_LIST_API
                ).then((res) => res.json());
                dispatch(setProduct(response));
            } catch (err) {
                console.log("err", err.message);
            }
        }
        fetchData();
        return () => {
            dispatch(removeProduct());
        };
    }, []);

    const MyAllProducts = productData.products;
    const FilterProduct = productData.filteredProducts;
    const AppliedFilterArry = productData.appliedFilters;

    const ListMap = ({ Arry }) => {
        return (
            <>
                {Arry.map((element, index) => (
                    <Link
                        to={`/product/detail/${element.id}`}
                        key={index}
                        className="listAnchor"
                    >
                        <div className="col">
                            <div className="card" style={{ height: "400px" }}>
                                <div
                                    className="card-img"
                                    style={{ backgroundImage: `url(${element.image})` }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{element.title}</h5>
                                    <p className="card-text">
                                        <span>
                                            Price:<span>{element.price}</span>
                                        </span>
                                    </p>
                                    <p className="card-text">
                                        <span className="badge bg-success h5">
                                            {element.rating.rate} &#9734;
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </>
        );
    };
    return (
        <>
            <Header />
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4  g-4 py-5">
                    {productData.products.length === 0 ? (
                        <h1>loading...</h1>
                    ) : AppliedFilterArry.length === 0 ? (
                        <ListMap Arry={MyAllProducts} />
                    ) : (
                        <ListMap Arry={FilterProduct} />
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductList;