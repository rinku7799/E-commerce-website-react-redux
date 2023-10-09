
import Header from "../component/header/header";
import Footer from "../component/footer/footer";
import Layout from "../component/layout/layout";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { Auth } from "../config/firebaseconfig";
import { useDispatch } from "react-redux";
import { authChecking } from "../redux/action";
import { useState } from "react";
import { db } from "../config/firebaseconfig"
import { storage } from "../config/firebaseconfig"
import { ref, getDownloadURL } from "firebase/storage";
import { getDocs, collection, query } from "firebase/firestore";
import useWindowSize from "../component/media-query/size";
import LoadingSpinner from "../component/loader/loader";


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            "Minimum eight characters, at least one letter and one number"
        )
        .required("Required"),
});
let data;
const Login = () => {
    const [loginModeError, setloginModeError] = useState({
        message: "",
        isError: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const size = useWindowSize();
    const Navigation = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (values, action) => {
        setIsLoading(true);
        try {
            const data = await setPersistence(Auth, browserSessionPersistence)
            const response = await signInWithEmailAndPassword(Auth, values.email, values.password);

            if (response) {
                const isUserstoreSomething = localStorage.getItem(`${values.email}`);
                if (!isUserstoreSomething) {
                    const mydatabase = await getDocs(collection(db, "usersData"));
                    mydatabase.forEach((query) => {
                        if (
                            query._document.data.value.mapValue.fields.userEmail
                                .stringValue === values.email
                        ) {
                            const refernce = ref(
                                storage,
                                `users/${query._document.data.value.mapValue.fields.userProfile.stringValue}`
                            );

                            if (refernce) {
                                getDownloadURL(refernce).then((res) => {
                                    localStorage.setItem(
                                        `${values.email}`,
                                        JSON.stringify({
                                            url: res,
                                            email: values.email,
                                            name: query._document.data.value.mapValue.fields.userName
                                                .stringValue,
                                            cart: [],
                                        })
                                    );
                                    dispatch(
                                        authChecking({
                                            email: values.email,
                                            flag: true,
                                        })
                                    );
                                });
                                Navigation("/");
                                setIsLoading(false);
                            } else {
                                dispatch(
                                    authChecking({
                                        email: values.email,
                                        flag: true,
                                    })
                                );
                                localStorage.setItem(
                                    `${values.email}`,
                                    JSON.stringify({
                                        url: "",
                                        email: values.email,
                                        cart: [],
                                        name: query._document.data.value.mapValue.fields.userName
                                            .stringValue,
                                    })
                                );
                                Navigation("/");
                                setIsLoading(false);
                            }
                        }
                    });
                } else {
                    dispatch(
                        authChecking({
                            email: values.email,
                            flag: true,
                        })
                    );
                    Navigation("/");
                }
            }
            setIsLoading(false);
        } catch (err) {
            setloginModeError((prev) => {
                return { ...prev, message: err.message, isError: true };
            });
            setIsLoading(false);
        }
        action.resetForm();
    };
    return (
        <>
            <Header />
            <div className="container login-divison  d-flex  justify-content-center px-5 mt-5">
                <div className="row loginlayout layout-form margin-divsion">
                    <div id="loginform " className="col-md-6 ps-0">
                        <h2 className="text-secondary text-center">Login</h2>
                        <div className="divider d-flex align-items-center my-3 "></div>
                        <Formik
                            initialValues={{ email: "", password: "" }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <Field type="email" name="email" className="form-control" />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="text form-label ">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to="/forgot/password">Forgot password?</Link>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 mt-5"
                                            disabled={isSubmitting}
                                        >
                                            {isLoading ? <LoadingSpinner /> : "Login"}
                                        </button>
                                    </div>
                                    {loginModeError.isError && (
                                        <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                                            {loginModeError.message}
                                        </p>
                                    )}

                                    <div className="mb-3 mt-3 text-center">
                                        Don't have an account?{" "}
                                        <span>
                                            <Link
                                                to={"/Register"}
                                                className="link-underline text-danger link-underline-opacity-0   fw-medium "
                                            >
                                                Register account
                                            </Link>
                                        </span>
                                    </div>
                                    {/* login */}
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {size.width > 780 && (
                        <div className="col-md-6 mt-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                alt=""
                                width={"100%"}
                                height={"90%"}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;