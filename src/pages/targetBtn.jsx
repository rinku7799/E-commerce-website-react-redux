import React from "react";
import { Link } from "react-router-dom";

const Targetbtn = ({ route, btnText }) => {
    return (
        <>
            <div className="d-flex justify-content-end">
                <Link to={route} className="btn btn-primary">
                    {btnText}
                </Link>
            </div>
        </>
    );
};

export default Targetbtn;