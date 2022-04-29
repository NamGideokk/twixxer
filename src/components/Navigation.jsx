import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHashtag,
  faHouse,
  faBell,
  faEnvelope,
  faBookmark,
  faList,
  faUser,
  faArrowRightFromBracket,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const NaviStyle = styled.div`
  .wrapper {
    width: fit-content;
    height: fit-content;
    position: fixed;
    top: 0;
  }

  .empty__div {
    width: 300px;
    height: 1px;
  }

  .navi__wrapper {
    width: 100%;
    height: fit-content;
    padding: 17px 0;
    background-color: var(--logo-color);
    font-size: 24px;
    /* position: fixed;
    top: 0;
    left: 0; */

    .first-list {
      font-size: 30px;
      padding: 10px;
      padding-top: 0;

      .lang__span {
        margin-left: 40px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.3s;
        padding: 5px;
        border-radius: 10px;

        :hover {
          background-color: var(--logo-dark-color);
        }
      }
      .lang__icon {
        margin-right: 5px;
      }
    }

    li {
      width: 300px;
      padding: 12px 15px;
      color: white;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        background-color: white;
        color: var(--logo-dark-color);
        padding-left: 30px;
      }
    }

    .nav__icons {
      width: 50px;
      padding-right: 10px;
    }
    .logout:hover {
      color: red;
    }
  }

  .logo__icon {
    width: 60px;
  }

  @media screen and (max-width: 1515px) {
  }
`;

const Navigation = () => {
  const navi = useNavigate();
  const [navLang, setNavLang] = useState(true);

  async function handleLogout() {
    try {
      await logout();
      navi("/");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  // 네이게이션 언어 변경
  function changeLanguage() {
    setNavLang(!navLang);
  }

  return (
    <NaviStyle>
      <div className="wrapper">
        <ul className="navi__wrapper">
          <div className="first-list">
            <FontAwesomeIcon icon={faTwitter} className="logo__icon" />
            twixxer
            <span onClick={changeLanguage} className="lang__span">
              <FontAwesomeIcon icon={faGlobe} className="lang__icon" />
              {navLang ? "ENG" : "KOR"}
            </span>
          </div>
          <NavLink to="/">
            <li>
              <FontAwesomeIcon icon={faHouse} className="nav__icons" />
              {navLang ? "홈" : "Home"}
            </li>
          </NavLink>
          <NavLink to="/explore">
            <li>
              <FontAwesomeIcon icon={faHashtag} className="nav__icons" />
              {navLang ? "탐색" : "Explore"}
            </li>
          </NavLink>
          <NavLink to="/notifications">
            <li>
              <FontAwesomeIcon icon={faBell} className="nav__icons" />
              {navLang ? "알림" : "Notifications"}
            </li>
          </NavLink>
          <NavLink to="/messages">
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="nav__icons" />
              {navLang ? "메세지" : "Messages"}
            </li>
          </NavLink>
          <NavLink to="/bookmarks">
            <li>
              <FontAwesomeIcon icon={faBookmark} className="nav__icons" />
              {navLang ? "북마크" : "Bookmarks"}
            </li>
          </NavLink>
          <NavLink to="/lists">
            <li>
              <FontAwesomeIcon icon={faList} className="nav__icons" />
              {navLang ? "목록" : "Lists"}
            </li>
          </NavLink>
          <NavLink to="/profile" activeStyle={{ color: "red" }}>
            <li>
              <FontAwesomeIcon icon={faUser} className="nav__icons" />
              {navLang ? "프로필" : "Profile"}
            </li>
          </NavLink>

          <li onClick={handleLogout} className="logout">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="nav__icons"
            />
            {navLang ? "로그아웃" : "Logout"}
          </li>
        </ul>
      </div>
      <div className="empty__div"></div>
    </NaviStyle>
  );
};

export default Navigation;
