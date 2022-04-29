import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCalendarDays,
  faCommentDots,
  faEnvelope,
  faImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth, upload, myFirestore } from "myFirebase";
import { deleteUser } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Aside from "components/Aside";
import { useNavigate } from "react-router-dom";

const ProfileStyle = styled.div`
  .profile__wrapper {
    width: 100%;
    height: fit-content;
    padding: 20px;
    background-color: rgb(30, 30, 30);
    color: #dcdcdc;

    margin: 0 auto;

    .form__wrapper {
      width: 100%;
      min-width: 310px;
      margin-bottom: 10px;
    }
    form {
      width: 100%;
    }
  }
  .util__buttons__wrapper {
    margin-top: 50px;
  }
  .avatar__label,
  .all-feeds-delete__button,
  .withdrawal__button {
    text-align: center;
    background-color: var(--logo-dark-color);
    padding: 10px 15px;
    width: 100%;
    max-width: 310px;
    height: fit-content;
    font-size: 18px;
    color: white;
    cursor: pointer;
    display: block;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    margin: 15px auto;
    transition: 0.3s;

    :active {
      transform: scale(0.95);
    }
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
  }
  .clear__button {
    :hover {
      background-color: #ff2929;
    }
  }

  /* 내 게시물 전부 삭제 버튼 */
  .all-feeds-delete__button,
  .withdrawal__button {
    :hover {
      background-color: #ff2929;
      box-shadow: 0 5px 5px rgba(255, 0, 0, 0.3);
    }
  }

  /* 메인 프레임 */
  .main__frame {
    display: flex;
    max-width: 1500px;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    /* background-color: beige; */

    .sec__a {
      background-color: red;
      width: 300px;
    }
    .sec__b {
      width: 780px;
      padding: 0 20px;
    }
    .sec__c {
      background-color: yellowgreen;
      width: 380px;
    }
  }

  .profile-data__icon {
    margin-right: 10px;
    width: 20px;
    text-align: center;
  }
  .display-name__input {
    background-color: transparent;
    font-size: 30px;
    border: none;
    width: 70%;
    min-width: 230px;
    padding: 0 5px;
    color: #dcdcdc;
  }
  .name-change__button {
    font-size: 20px;
    padding: 5px 15px;
    background-color: var(--logo-dark-color);
    color: white;
    margin-left: 10px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    transform: translateY(-4px);

    animation: opacity-animation 0.5s;
  }

  .info__wrapper {
    p {
      margin: 5px 0;
    }
  }

  .avatar__buttonSt {
    text-align: center;
    background-color: var(--logo-dark-color);
    padding: 10px 15px;
    width: 100%;
    max-width: 310px;
    height: fit-content;
    font-size: 18px;
    color: white;
    cursor: pointer;
    display: block;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    margin: 15px auto;
    transition: 0.3s;
  }
`;

const Profile = () => {
  const currentUser = useAuth();
  const navi = useNavigate();

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );
  const [prevPhotoURL, setPrevPhotoURL] = useState(null);
  const [displayName, setDisplayName] = useState(currentUser?.displayName);
  const [nameButton, setNameButton] = useState(false);

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser?.photoURL]);

  function handleFile(e) {
    const reader = new FileReader();

    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      reader.onloadend = (e) => {
        setPrevPhotoURL(e.currentTarget.result);
      };
      const newPhoto = reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleUpload() {
    upload(photo, currentUser, setLoading);
    clearNewPhoto();
  }

  async function allFeedsDelete() {
    const collectionRef = collection(myFirestore, "feeds");

    const deleteConfirm = window.confirm(
      "정말 나의 모든 게시물을 삭제하시겠습니까?"
    );

    if (deleteConfirm) {
      const q = query(collectionRef, where("userId", "==", currentUser.email));

      const snapshot = await getDocs(q);

      const results = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(results);

      results.forEach(async (result) => {
        const docRef = doc(myFirestore, "feeds", result.id);

        if (results.length === 0) {
          alert("삭제할 게시물이 없습니다.");
        }

        try {
          await deleteDoc(docRef);
        } catch (e) {
          console.log(e.code, e.message);
          alert(e.message);
        }
      });
    }
  }

  function clearNewPhoto() {
    setPrevPhotoURL(null);
    setPhoto(null);
  }

  function changeName(e) {
    setDisplayName(e.target.value);

    if (e.target.value.length >= 2) {
      setNameButton(true);
    } else {
      setNameButton(false);
    }
  }

  function submitName(e) {
    e.preventDefault();
    alert("이름이 수정되었습니다.");
    setNameButton(false);
  }

  // 회원탈퇴
  async function handleDeleteUser() {
    const deleteUserConfirm = window.confirm("회원탈퇴를 진행하시겠습니까?");

    if (deleteUserConfirm) {
      try {
        await deleteUser(currentUser);
        alert("정삭적으로 탈퇴되었습니다.");
        navi("/");
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    }
  }

  return (
    <>
      <ProfileStyle>
        <div className="main__frame">
          <div className="sec__a">
            <Navigation />
          </div>
          <div className="sec__b">
            <div className="profile__wrapper">
              <img
                src={prevPhotoURL ? prevPhotoURL : photoURL}
                alt="avatar"
                className="avatar"
              />
              <div className="form__wrapper">
                <form onSubmit={submitName}>
                  <input
                    className="display-name__input"
                    type="text"
                    value={!displayName ? "" : displayName}
                    placeholder="이름을 설정하세요"
                    minLength={2}
                    maxLength={8}
                    onChange={changeName}
                  />
                  {nameButton && (
                    <button className="name-change__button">수정</button>
                  )}
                </form>
              </div>
              <div className="info__wrapper">
                <p>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="profile-data__icon"
                  />
                  {currentUser?.email}
                </p>
                {currentUser && (
                  <>
                    <p>
                      <FontAwesomeIcon
                        icon={faCommentDots}
                        className="profile-data__icon"
                      />
                      introduce
                    </p>
                    <p className="date">
                      <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        className="profile-data__icon"
                      />
                      계정 생성일{" "}
                      {currentUser?.metadata.creationTime.substring(0, 22)}
                    </p>
                    <p className="date">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="profile-data__icon"
                      />
                      마지막 접속{" "}
                      {currentUser?.metadata.lastSignInTime.substring(0, 22)}
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="profile-data__icon"
                      />
                      내 트윅 (0)
                    </p>
                  </>
                )}
              </div>
              <div className="util__buttons__wrapper">
                {photo ? (
                  <>
                    <button
                      disabled={loading}
                      onClick={handleUpload}
                      className="upload__button avatar__buttonSt"
                    >
                      {loading ? "업로드중..." : "아바타 업로드"}
                    </button>
                    <button
                      className="clear__button avatar__buttonSt"
                      onClick={clearNewPhoto}
                    >
                      변경 취소
                    </button>
                  </>
                ) : (
                  <label htmlFor="file" className="avatar__label">
                    <FontAwesomeIcon icon={faImage} className="img__icon" />
                    아바타 변경
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  onChange={handleFile}
                />
                <button
                  className="all-feeds-delete__button"
                  onClick={allFeedsDelete}
                >
                  내 게시물 전부 삭제
                </button>
                <button
                  className="withdrawal__button"
                  onClick={handleDeleteUser}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
          <div className="sec__c">
            <Aside />
          </div>
        </div>
      </ProfileStyle>
    </>
  );
};

export default Profile;
