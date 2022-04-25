import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logout, useAuth } from "myFirebase";
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
    margin: 50px auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .navi__wrapper {
    width: fit-content;
    height: fit-content;
    padding: 17px 0;
    background-color: var(--logo-color);
    font-size: 28px;
    border-radius: 10px;

    .first-list {
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
          background-color: white;
        }
      }
      .lang__icon {
        margin-right: 5px;
      }
    }

    li {
      width: 300px;
      padding: 15px;
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
  const navi = useNavigate();

  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );
  const [navLang, setNavLang] = useState(true);

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

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
        <div className="user__wrapper">
          <img src={photoURL} alt="avatar" className="avatar" />
          <h1 className="user-email">{currentUser?.email}</h1>
        </div>
        <ul className="navi__wrapper">
          <div className="first-list">
            <FontAwesomeIcon icon={faTwitter} className="logo__icon" />
            twixxer
            <span onClick={changeLanguage} className="lang__span">
              <FontAwesomeIcon icon={faGlobe} className="lang__icon" />
              {navLang ? "ENG" : "KOR"}
            </span>
          </div>
          <Link to="/">
            <li>
              <FontAwesomeIcon icon={faHouse} className="nav__icons" />
              {navLang ? "홈" : "Home"}
            </li>
          </Link>
          <Link to="/explore">
            <li>
              <FontAwesomeIcon icon={faHashtag} className="nav__icons" />
              {navLang ? "탐색" : "Explore"}
            </li>
          </Link>
          <Link to="/notifications">
            <li>
              <FontAwesomeIcon icon={faBell} className="nav__icons" />
              {navLang ? "알림" : "Notifications"}
            </li>
          </Link>
          <Link to="/messages">
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="nav__icons" />
              {navLang ? "메세지" : "Messages"}
            </li>
          </Link>
          <Link to="/bookmarks">
            <li>
              <FontAwesomeIcon icon={faBookmark} className="nav__icons" />
              {navLang ? "북마크" : "Bookmarks"}
            </li>
          </Link>
          <Link to="/lists">
            <li>
              <FontAwesomeIcon icon={faList} className="nav__icons" />
              {navLang ? "목록" : "Lists"}
            </li>
          </Link>
          <Link to="/profile">
            <li>
              <FontAwesomeIcon icon={faUser} className="nav__icons" />
              {navLang ? "프로필" : "Profile"}
            </li>
          </Link>

          <li onClick={handleLogout} className="logout">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="nav__icons"
            />
            {navLang ? "로그아웃" : "Logout"}
          </li>
        </ul>
      </div>
    </NaviStyle>
  );
};

export default Navigation;
