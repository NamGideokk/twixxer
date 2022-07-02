import React, { useEffect, useState } from "react";
import "./header.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((store) => store);

  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  return (
    <header className="user__wrapper">
      <div className="avatar-name__wrapper">
        <img src={photoURL} alt="avatar" className="avatar" />
        <div className="name-email__wrapper">
          <h1 className="user-name">{user?.displayName}</h1>
          <h1 className="user-email">{user?.email}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
