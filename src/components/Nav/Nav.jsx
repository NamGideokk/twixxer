import React, { useState } from "react";
import "./Nav.scss";
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

const Nav = () => {
  const navi = useNavigate();
  let language = localStorage.getItem("lang");
  const [navLang, setNavLang] = useState(language); // true : kor, false : eng

  if (language === null) {
    localStorage.setItem("lang", true);
    setNavLang(true);
  } else {
    language = localStorage.getItem("lang");

    // if (language === "kor") {
    //   setNavLang(true);
    // } else {
    //   setNavLang(false);
    // }
  }

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

    if (navLang === true) {
      localStorage.setItem("lang", "kor");
    } else {
      localStorage.setItem("lang", "eng");
    }
  }

  return (
    <nav className="wrapper">
      <ul className="navi__wrapper">
        <div className="first-list">
          <FontAwesomeIcon icon={faTwitter} className="logo__icon" />
          <span className="twixxer">twixxer</span>
          <span onClick={changeLanguage} className="lang__span">
            <FontAwesomeIcon icon={faGlobe} className="lang__icon" />
            {navLang ? "ENG" : "KOR"}
          </span>
        </div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          {/* className="phone-device-none" */}
          <li>
            <FontAwesomeIcon icon={faHouse} className="nav__icons" />
            {language === "kor" ? "홈" : "Home"}
          </li>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faHashtag} className="nav__icons" />
            {language === "kor" ? "탐색" : "Explore"}
          </li>
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faBell} className="nav__icons" />
            {language === "kor" ? "알림" : "Notifications"}
          </li>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faEnvelope} className="nav__icons" />
            {language === "kor" ? "메세지" : "Messages"}
          </li>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faBookmark} className="nav__icons" />
            {language === "kor" ? "북마크" : "Bookmarks"}
          </li>
        </NavLink>
        <NavLink
          to="/lists"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faList} className="nav__icons" />
            {language === "kor" ? "목록" : "Lists"}
          </li>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          <li>
            <FontAwesomeIcon icon={faUser} className="nav__icons" />
            {language === "kor" ? "프로필" : "Profile"}
          </li>
        </NavLink>

        <li onClick={handleLogout} className="logout">
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="nav__icons"
          />
          {language === "kor" ? "로그아웃" : "Logout"}
        </li>
      </ul>
    </nav>
    // <div className="empty__div"></div>
  );
};

export default Nav;
