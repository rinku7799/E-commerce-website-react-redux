import Header from "../component/header/header";
import Footer from "../component/footer/footer";
// import Layout from "../component/layout/layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "./register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../config/firebaseconfig";
import { useDispatch } from "react-redux";
import { authChecking } from "../redux/action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebaseconfig"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseconfig"
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { v4 } from "uuid";
import useWindowSize from "../component/media-query/size";
import LoadingSpinner from "../component/loader/loader";

const initialValues = {
    name: "",
    email: "",
    file: "",
    password: "",
    confirmPassword: "",
};
const Register = () => {
    const [loginModeError, setloginModeError] = useState({
        message: "",
        isError: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    console.log(isLoading);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const size = useWindowSize();

    async function createDb(data, fileName) {
        const userDataRef = collection(db, "usersData");
        try {
            const docRef = await addDoc(userDataRef, {
                userName: data.name,
                userEmail: data.email,
                userProfile: data.file.name ? fileName : "",
            });
        } catch (err) {
            setIsLoading(false);
            setloginModeError((prev) => {
                return { ...prev, message: err.message, isError: true };
            });
        }
    }

    function createStorageWithUserProfile(data, fileName) {
        const storageRef = ref(storage, `/users/${fileName}`);
        uploadBytes(storageRef, data.file)
            .then((res) => {
                const refernce = ref(storage, res.ref._location.path_);
                return getDownloadURL(refernce);
            })
            .then((res) => {
                localStorage.setItem(
                    `${data.email}`,
                    JSON.stringify({
                        url: res,
                        email: data.email,
                        cart: [],
                        name: data.name,
                    })
                );

                dispatch(
                    authChecking({
                        email: data.email,
                        flag: true,
                    })
                );

                setIsLoading(false);
                navigation("/");
            })
            .catch((err) => {
                setIsLoading(false);
                setloginModeError((prev) => {
                    return { ...prev, message: err.message, isError: true };
                });
            });
    }

    function createUserWithoutProfile(data) {
        try {
            localStorage.setItem(
                `${data.email}`,
                JSON.stringify({
                    url: "",
                    email: data.email,
                    cart: [],
                    name: data.name,
                })
            );

            dispatch(
                authChecking({
                    email: data.email,
                    flag: true,
                })
            );

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setloginModeError((prev) => {
                return { ...prev, message: err.message, isError: true };
            });
        }
    }

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues,
        validationSchema: yup.object().shape({
            name: yup
                .string()
                .min(4, "minimum 4 chreacter")
                .max(20)
                .required("please enter your name"),
            email: yup.string().email().required(),
            password: yup
                .string()
                .required("please enter your password")
                .min(8)
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    "At least one letter and one number"
                ),
            confirmPassword: yup
                .string()
                .required("Please ReEnter Your Password")
                .oneOf([yup.ref("password"), null], "password must not match"),
        }),
        onSubmit: async (values, action) => {
            setIsLoading((prev) => {
                return !prev;
            });
            try {
                const responseRegistration = await setPersistence(
                    Auth,
                    browserSessionPersistence
                );
                const authResponse = await createUserWithEmailAndPassword(
                    Auth,
                    values.email,
                    values.password
                );

                const fileName = values.file.name + v4();
                createDb(values, fileName);
                if (authResponse) {
                    values.file.name
                        ? createStorageWithUserProfile(values, fileName)
                        : createUserWithoutProfile(values);
                }
            } catch (err) {
                setIsLoading(false);
                setloginModeError((prev) => {
                    return { ...prev, message: err.message, isError: true };
                });
            }
            action.confirmPassword = "";
            action.resetForm();
        },
    });

    return (
        <>
            <Header />
            <div className="container mt-5 d-flex align-items-center justify-content-center register-divison  ">
                <div className="row shadow-sm p-3 mb-2 bg-body-info rounded">
                    {size.width > 770 && (
                        <div className="col-md-6 ">
                            <img
                                className="object-fit-contain"
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                alt="image"
                                width={"100%"}
                                height={"90%"}
                            />
                        </div>
                    )}
                    <div className="col-md-6 col-12">
                        <div className="card border-0 g-2">
                            <div className="card-body ">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-center text-captalize">Create Account</h2>
                                    <div className="divider d-flex align-items-center my-3 "></div>

                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.name && touched.name ? (
                                            <div className="text-danger">{errors.name}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="abcd1234@gmail.com"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.email && touched.email ? (
                                            <div className="text-danger">{errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="file" className="form-label">
                                            profile
                                        </label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="file"
                                            id="file"
                                            onChange={(event) => {
                                                setFieldValue("file", event.currentTarget.files[0]);
                                            }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Minimum eight characters password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.password && touched.password ? (
                                            <div className="text-danger">{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">
                                            Confirm password{" "}
                                        </label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="ReEnter the password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />

                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <div className="text-danger">
                                                {errors.confirmPassword}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <button className="btn btn-primary w-100" type="submit">
                                            {isLoading ? <LoadingSpinner /> : "signUp"}
                                        </button>
                                        {loginModeError.isError && (
                                            <p className="text-danger text-center fw-bold text-capitalize my-3 py-2 bg-success-subtle">
                                                {loginModeError.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-3 mt-3 text-center">
                                        Already have an account?{" "}
                                        <span>
                                            <Link
                                                to={"/Login"}
                                                className="link-underline link-underline-opacity-0 fw-medium "
                                            >
                                                Login
                                            </Link>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Register;
