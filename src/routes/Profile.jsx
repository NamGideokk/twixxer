import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useAuth, upload } from "myFirebase";

const ProfileStyle = styled.div`
  .profile__wrapper {
    width: fit-content;
    height: fit-content;
    padding: 20px;
    background-color: var(--logo-color);
    border-radius: 10px;
    margin: 50px auto;
  }
  .avatar__label {
    background-color: var(--logo-dark-color);
    padding: 10px 15px;
    width: fit-content;
    height: fit-content;
    font-size: 20px;
    color: white;
    cursor: pointer;
    display: block;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  }
  .img__icon {
    margin-right: 10px;
  }
  #file {
    display: none;
  }
  .avatar {
    width: 150px;
    height: 150px;
    border: 2px solid var(--logo-dark-color);
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
    margin-top: 10px;
    margin-right: 20px;
    display: block;
    margin: 0 auto 20px auto;
  }

  .upload__button {
    width: 100%;
    height: fit-content;
    padding: 5px 10px;
    font-size: 20px;
    margin-top: 10px;
  }
`;

const Profile = () => {
  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  function handleFile(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleUpload() {
    upload(photo, currentUser, setLoading);
  }
  return (
    <>
      <Navigation />
      <ProfileStyle>
        <div className="profile__wrapper">
          <img src={photoURL} alt="avatar" className="avatar" />
          <label htmlFor="file" className="avatar__label">
            <FontAwesomeIcon icon={faImage} className="img__icon" />
            아바타 변경
          </label>
          <input type="file" id="file" onChange={handleFile} />
          {photo && (
            <button
              disabled={loading}
              onClick={handleUpload}
              className="upload__button"
            >
              {loading ? "업로드중..." : "업로드"}
            </button>
          )}
        </div>
      </ProfileStyle>
    </>
  );
};

export default Profile;
