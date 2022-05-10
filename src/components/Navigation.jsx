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

  @media screen and (max-width: 820px) {
    .navi__wrapper {
      width: 80px;
      overflow: hidden;
    }
    .nav__icons {
      width: 60px;
      font-size: 30px;
      margin-right: 30px;
    }

    li {
      width: 80px !important;
      white-space: nowrap;
      :hover {
        padding-left: 15px !important;
      }
    }
    .empty__div {
      width: 80px;
      height: 1px;
    }
    .first-list {
    }
    .lang__span {
      display: none;
    }
    .twixxer {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 414px) {
    .navi__wrapper {
      display: flex;
      position: fixed;
      bottom: 0;
      margin: 0 auto;
      width: 100vw;
      height: 65px;
      padding: 0;
      background-color: rgba(169, 132, 237, 0.5);
      backdrop-filter: blur(10px);
      justify-content: space-evenly;

      li {
        width: 25px !important;
        height: 65px;
        overflow: hidden;
        /* margin: 0 25px; */
        padding: 17px 0;

        :hover {
          color: white;
          padding-left: 0 !important;
          background-color: transparent !important;
        }
      }

      .phone-device-none {
        display: none;
      }
    }
    .nav__icons {
      width: 25px !important;
      padding: 0 !important;
      margin-right: 0 !important;
    }
    .first-list {
      display: none;
    }
  }
`;

const Navigation = () => {
  const navi = useNavigate();
  const [navLang, setNavLang] = useState(true);

  async function handleLogout() {
    try {
      await logout();
      alert("로그아웃 되었습니다.");
      navi("/login");
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
            <span className="twixxer">twixxer</span>
            <span onClick={changeLanguage} className="lang__span">
              <FontAwesomeIcon icon={faGlobe} className="lang__icon" />
              {navLang ? "ENG" : "KOR"}
            </span>
          </div>
          <NavLink to="/">
            {/* className="phone-device-none" */}
            <li>
              <FontAwesomeIcon icon={faHouse} className="nav__icons" />
              {navLang ? "홈" : "Home"}
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <FontAwesomeIcon icon={faHashtag} className="nav__icons" />
              {navLang ? "탐색" : "Explore"}
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <FontAwesomeIcon icon={faBell} className="nav__icons" />
              {navLang ? "알림" : "Notifications"}
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="nav__icons" />
              {navLang ? "메세지" : "Messages"}
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <FontAwesomeIcon icon={faBookmark} className="nav__icons" />
              {navLang ? "북마크" : "Bookmarks"}
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <FontAwesomeIcon icon={faList} className="nav__icons" />
              {navLang ? "목록" : "Lists"}
            </li>
          </NavLink>
          <NavLink to="/profile">
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
