import React from "react";

const ModalProfile = ({ myProfile }) => {
    return (
        <>
            <img
                src={
                    myProfile?.url.length === 0
                        ? "https://e7.pngegg.com/pngimages/709/450/png-clipart-shining-stars-star-white-thumbnail.png"
                        : myProfile?.url
                }
                alt="image"
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid black",
                }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
            />
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content ">
                        <div className="modal-header justify-content-center">
                            <label
                                htmlFor="photo-upload "
                                className="custom-file-upload fas "
                            >
                                <div className="img-wrap img-upload ">
                                    <img
                                        src={myProfile?.url}
                                        alt="image"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                            border: "2px solid black",
                                        }}
                                    />
                                </div>
                            </label>
                            {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              /> */}
                        </div>
                        <div className="modal-body">
                            {/* <form>
                <div className="mb-3">
                  <label htmlFor="user-name" className="col-form-label">
                   Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="user-name"
                    defaultValue={myProfile.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="col-form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    defaultValue={myProfile.email}
                  />
                </div>
              </form> */}
                            <p className="h3 text-capitalize text-center">
                                Hello ! {myProfile?.name}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalProfile;