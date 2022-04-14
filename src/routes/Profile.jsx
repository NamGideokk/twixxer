import React from "react";
import { logout } from "myFirebase";

const Profile = () => {
  function onLogoutClick() {
    return logout();
  }
  return (
    <div>
      Profile
      <button onClick={onLogoutClick}>로그아웃</button>
    </div>
  );
};

export default Profile;
