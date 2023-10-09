import React from "react";
import { useSelector } from "react-redux";
import ModalProfile from "./profileModal";

const Profile = () => {
  const checkUserLogin = useSelector((state) => state.isUserLoggedIn);
  if (checkUserLogin.islogin) {
    const userProfileUrl = JSON.parse(
      localStorage.getItem(`${checkUserLogin.email}`)
    );
    return <ModalProfile myProfile={userProfileUrl} />;
  }
};

export default Profile;