import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NaviStyle = styled.div`
  .navi__wrapper {
    width: 200px;
    height: 100px;
    background-color: white;
  }
`;

const Navigation = () => {
  return (
    <NaviStyle>
      <ul className="navi__wrapper">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/profile">
          <li>My Profile</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
      </ul>
    </NaviStyle>
  );
};

export default Navigation;
