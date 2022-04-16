import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { logout, useAuth } from "myFirebase";

const NaviStyle = styled.div`
  .wrapper {
    width: fit-content;
    height: fit-content;
    margin: 50px auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .navi__wrapper {
    width: fit-content;
    height: 60px;
    padding: 17px 20px;
    background-color: var(--logo-color);
    font-size: 22px;
    border-radius: 10px;

    display: flex;

    li {
      margin: 0 20px;
      color: white;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        color: black;
      }
    }
  }

  .user__wrapper {
    width: fit-content;
    height: fit-content;
    background-color: var(--logo-color);
    border-radius: 10px;
    padding: 0 20px;
    margin: 0 auto 20px auto;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
    margin-top: 10px;
    margin-right: 20px;
  }
  .user-email {
    display: inline-block;
  }
`;

const Navigation = () => {
  const currentUser = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  return (
    <NaviStyle>
      <div className="wrapper">
        <div className="user__wrapper">
          <img
            src="http://cdn.onlinewebfonts.com/svg/img_264570.png"
            alt="avatar"
            className="avatar"
          />
          <h1 className="user-email">{currentUser?.email}</h1>
        </div>
        <ul className="navi__wrapper">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/profile">
            <li>My Profile</li>
          </Link>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </NaviStyle>
  );
};

export default Navigation;
