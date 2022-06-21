import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useAuth } from "myFirebase";
import AlertContainer from "common/AlertContainer";
import FeedForm from "./FeedForm";

const Header = () => {
  const currentUser = useAuth();

  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );
  const [animation, setAnimation] = useState("");
  const [display, setDisplay] = useState("");
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <>
      <header className="user__wrapper">
        <div className="avatar-name__wrapper">
          <img src={photoURL} alt="avatar" className="avatar" />
          <div className="name-email__wrapper">
            <h1 className="user-email name">{currentUser?.displayName}</h1>
            <h1 className="user-email">{currentUser?.email}</h1>
          </div>
        </div>
        <FeedForm />
      </header>
      <AlertContainer
        animation={animation}
        alertContent={alertContent}
        display={display}
      />
    </>
  );
};

export default Header;
