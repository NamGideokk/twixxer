import React, { useState } from "react";
import "./nav.scss";
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
import { useContext } from "react";
import { LanguageContext } from "context/LanguageContext";

const Nav = () => {
  const navi = useNavigate();
  const { isKor, setIsKor } = useContext(LanguageContext);

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
    setIsKor(!isKor);
  }

  return (
    <nav className="wrapper">
      <ul className="navi__wrapper">
        <div className="first-list">
          <FontAwesomeIcon icon={faTwitter} className="logo__icon" />
          <span className="twixxer">twixxer</span>
          <span onClick={changeLanguage} className="lang__span">
            <FontAwesomeIcon icon={faGlobe} className="lang__icon" />
            {isKor ? "ENG" : "KOR"}
          </span>
        </div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          {/* className="phone-device-none" */}
          <li>
            <FontAwesomeIcon icon={faHouse} className="nav__icons" />
            {isKor ? "홈" : "Home"}
          </li>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faHashtag} className="nav__icons" />
            {isKor ? "탐색" : "Explore"}
          </li>
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faBell} className="nav__icons" />
            {isKor ? "알림" : "Notifications"}
          </li>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faEnvelope} className="nav__icons" />
            {isKor ? "메세지" : "Messages"}
          </li>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faBookmark} className="nav__icons" />
            {isKor ? "북마크" : "Bookmarks"}
          </li>
        </NavLink>
        <NavLink
          to="/lists"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faList} className="nav__icons" />
            {isKor ? "목록" : "Lists"}
          </li>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faUser} className="nav__icons" />
            {isKor ? "프로필" : "Profile"}
          </li>
        </NavLink>

        <li onClick={handleLogout} className="logout">
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="nav__icons"
          />
          {isKor ? "로그아웃" : "Logout"}
        </li>
      </ul>
    </nav>
    // <div className="empty__div"></div>
  );
};

export default Nav;
