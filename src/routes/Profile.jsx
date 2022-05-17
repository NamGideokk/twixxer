import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "components/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCalendarDays,
  faEnvelope,
  faImage,
  faPaperPlane,
  faCheck,
  faReply,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth, upload, myFirestore } from "myFirebase";
import {
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import Aside from "components/Aside";
import { useNavigate } from "react-router-dom";
import FeedContainer from "components/FeedContainer";
import LoadingContainer from "common/LoadingContainer";
import AlertContainer from "common/AlertContainer";
import ReplyContainer from "components/ReplyContainer";

const ProfileStyle = styled.div`
  .profile__wrapper {
    width: 100%;
    height: fit-content;
    padding: 0 20px 20px 20px;
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
    margin-top: 70px;
  }
  .avatar__label,
  .all-feeds-delete__button,
  .withdrawal__button {
    text-align: center;
    background-color: var(--logo-dark-color);
    padding: 10px 15px;
    width: 100%;
    max-width: 250px;
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
    display: block;
    margin: 0 auto;
    z-index: 10;
    transition: 0.3s;
    position: relative;
    bottom: 230px;

    :hover {
      transform: scale(1.2);
    }
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
    display: grid;
    grid-template-columns: 300px minmax(500px, 820px) minmax(300px, 380px);
    grid-template-rows: 1fr;
    grid-template-areas: "a b c";
    max-width: 1500px;
    margin: 0 auto;

    .sec__a {
      grid: a;
    }
    .sec__b {
      grid: b;
      padding-bottom: 100px;
      min-width: 500px;
      padding: 0 20px;
      padding-bottom: 100px;
    }
    .sec__c {
      grid: c;
      max-width: 380px;
      min-width: 300px;
    }
  }

  .profile-data__icon {
    margin-right: 10px;
    width: 20px;
    text-align: center;
    color: var(--logo-color);
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
    font-size: 18px;
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
    max-width: 250px;
    height: fit-content;
    font-size: 18px;
    color: white;
    cursor: pointer;
    display: block;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    margin: 15px auto;
    transition: 0.3s;
  }

  .avatar-background {
    width: 100%;
    height: 300px;
    object-fit: cover;
    z-index: 9;
    filter: brightness(80%);
  }
  .form__wraapper,
  .info__wrapper,
  .util__buttons__wrapper {
    position: relative;
    bottom: 130px;
  }

  .my-feed__wrapper {
  }

  .check__icon {
    color: #2ed82e;
    margin-left: 5px;
  }

  .verify-email__button {
    color: var(--logo-dark-color);
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;

    :hover {
      color: var(--logo-color);
    }
  }

  .reply__icon {
    transform: rotate(180deg);
  }

  .header {
    color: #dcdcdc;
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .reply__header {
    margin-top: 50px;
  }

  @media screen and (max-width: 1280px) {
    .main__frame {
      grid-template-columns: 300px minmax(500px, 1fr);
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        "a b"
        "c b";
    }
    .sec__c {
    }
  }

  @media screen and (max-width: 1280px) and (min-width: 821px) {
    .main__frame {
      grid-template-columns: 300px minmax(500px, 1fr);
      grid-template-rows: fit-content fit-content;
      grid-template-areas:
        "a b"
        "c b";
    }
    .sec__c {
    }
  }

  @media screen and (max-width: 820px) {
    .main__frame {
      grid-template-columns: 80px minmax(300px, auto) !important;
      grid-template-rows: 1fr !important;
      grid-template-areas: "a b" !important;
    }
    .sec__b {
      width: 90vw !important;
    }
    .sec__c {
      width: 0 !important;
    }
  }

  @media screen and (max-width: 414px) {
    .main__frame {
      grid-template-columns: 100vw !important;
      grid-template-rows: 1fr 70px !important;
      grid-template-areas:
        "b"
        "a" !important;
      width: 100vw !important;
    }
    .sec__a {
      width: 100vw !important;
      height: 55px !important;
      position: fixed !important;
      bottom: 0 !important;
      left: 0 !important;
      z-index: 90;
    }
    .sec__b {
      width: 100vw !important;
      min-width: 100vw !important;
      padding: 0 !important;
      margin: 0 auto 50px auto !important;
    }
    .sec__c {
      width: 0 !important;
      display: none;
    }
    .profile__wrapper {
      width: 100vw !important;
      margin: 0;
      padding: 0;
      font-size: 15px;
    }
    .avatar-background {
      height: 200px;
    }
    .avatar {
      bottom: 180px;
      :hover {
        transform: scale(1.1);
      }
    }
    .form__wraapper {
      padding: 0 20px;
    }
    .info__wrapper {
      padding: 0 20px;
    }
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
  const [bgImg, setBgImg] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [nameButton, setNameButton] = useState(false);
  const [myTwixxs, setMyTwixxs] = useState([]);
  const [myReplys, setMyReplys] = useState([]);

  // 좌측하단 알림창 state
  const [alertAnimation, setAlertAnimation] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [display, setDisplay] = useState("none");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser?.photoURL]);

  useEffect(() => {
    if (currentUser?.displayName) {
      setDisplayName(currentUser.displayName);
    }
  }, [currentUser?.displayName]);

  useEffect(() => {
    if (currentUser?.email) {
      setLoading(true);

      const collectionRef = collection(myFirestore, "feeds");
      const q = query(
        collectionRef,
        where("userId", "==", currentUser.email),
        orderBy("timestamp", "desc")
      );

      const unsub = onSnapshot(q, (snapshot) => {
        setMyTwixxs(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      setLoading(false);
      return unsub;
    }
  }, [currentUser?.email]);

  useEffect(() => {
    setLoading(true);

    if (currentUser?.email) {
      const collectionRef = collection(myFirestore, "replys");
      const q = query(
        collectionRef,
        where("userId", "==", currentUser.email),
        orderBy("timestamp", "desc")
      );

      const unsub = onSnapshot(q, (snapshot) => {
        setMyReplys(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      setLoading(false);
      return unsub;
    }
  }, [currentUser?.email]);

  useEffect(() => {
    if (currentUser === null && currentUser !== undefined) {
      navi("/login");
    }
  }, [currentUser]);

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

  async function handleUpload() {
    try {
      upload(photo, currentUser, setLoading);
      clearNewPhoto();
      setTimeout(() => {
        setAlertContent("아바타가 변경되었습니다.");
        setBackgroundColor("#a984ed");
        setDisplay("block");
        if (window.screen.width <= 414) {
          setAlertAnimation("mobile-open-alert");
        } else {
          setAlertAnimation("open-alert");
        }
      }, 500);
      setTimeout(() => {
        newAlert();
      }, 1000);
    } catch (e) {
      console.log(e.code);
      alert(e.message);
    }
  }

  // 내 게시물 전부 삭제
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

      results.forEach(async (result) => {
        const docRef = doc(myFirestore, "feeds", result.id);

        try {
          await deleteDoc(docRef);
        } catch (e) {
          console.log(e.code, e.message);
          alert(e.message);
        }
      });
    }
  }

  // 아바타(프로필사진) 변경값 삭제
  function clearNewPhoto() {
    setPrevPhotoURL(null);
    setPhoto(null);
  }

  // 회원탈퇴
  async function handleDeleteUser() {
    const deleteUserConfirm = window.confirm("회원탈퇴를 진행하시겠습니까?");

    if (deleteUserConfirm) {
      try {
        await deleteUser(currentUser);
        alert("탈퇴가 정상적으로 처리되었습니다. 이용해 주셔서 감사합니다.");
        navi("/");
      } catch (e) {
        console.log(e);
        if (e.code === "auth/requires-recent-login") {
          alert("로그인한지 일정시간이 초과되어 재로그인이 필요합니다.");
          const confirmPassword = prompt("비밀번호를 입력해주세요");

          try {
            const credential = EmailAuthProvider.credential(
              currentUser.email,
              confirmPassword
            );
            await reauthenticateWithCredential(currentUser, credential);
            alert(
              "탈퇴가 정상적으로 처리되었습니다. 이용해 주셔서 감사합니다."
            );
            navi("/login");
          } catch (e) {
            console.log(e.code);
            if (e.code === "auth/wrong-password") {
              alert("비밀번호가 맞지 않습니다. 다시 시도해 주세요.");
            }
          }
        }
      }
    }
  }

  // 이름 변경 input, 수정 버튼 생성 handle
  function changeName(e) {
    setDisplayName(e.target.value);

    if (e.target.value.length >= 2) {
      setNameButton(true);
    } else {
      setNameButton(false);
    }
  }

  // 이름 수정
  async function handleName() {
    try {
      await updateProfile(currentUser, {
        displayName: displayName,
      });
      setTimeout(() => {
        setAlertContent("이름이 변경되었습니다.");
        setBackgroundColor("#a984ed");
        setDisplay("block");
        if (window.screen.width <= 414) {
          setAlertAnimation("mobile-open-alert");
        } else {
          setAlertAnimation("open-alert");
        }
      }, 500);
      setTimeout(() => {
        newAlert();
      }, 1000);
    } catch (e) {
      alert(e.message);
      console.log(e.code);
    }
  }

  // 이름 변경 후 수정 버튼 사라지게
  function submitName(e) {
    e.preventDefault();
    setNameButton(false);
  }

  // 이메일 인증하기
  function verifyEmail() {
    alert("이메일 인증");
  }

  function newAlert() {
    setTimeout(() => {
      if (window.screen.width <= 414) {
        setAlertAnimation("mobile-close-alert");
      } else {
        setAlertAnimation("close-alert");
      }
    }, 4000);

    setTimeout(() => {
      setAlertContent("");
      setBackgroundColor("");
      setDisplay("none");
    }, 5000);
  }

  console.log("내 리플", myReplys);

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
                // src={process.env.PUBLIC_URL + "imgs/userBgimg.png"}
                src={
                  bgImg
                    ? bgImg
                    : "https://i.pinimg.com/736x/ee/7d/f1/ee7df1e617d1ab095b75110f2e4dde97.jpg"
                }
                alt="avatar-background"
                className="avatar-background"
              />
              <img
                src={prevPhotoURL ? prevPhotoURL : photoURL}
                alt="avatar"
                className="avatar"
              />

              <div className="form__wraapper">
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
                    <button
                      className="name-change__button"
                      onClick={handleName}
                    >
                      수정
                    </button>
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
                  {currentUser?.emailVerified ? (
                    <span>
                      인증완료
                      <FontAwesomeIcon icon={faCheck} className="check__icon" />
                    </span>
                  ) : (
                    <span
                      className="verify-email__button"
                      onClick={verifyEmail}
                    >
                      이메일을 인증하세요
                    </span>
                  )}
                </p>
                {currentUser && (
                  <>
                    <p className="date">
                      <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        className="profile-data__icon"
                      />
                      계정 생성일 :{" "}
                      {currentUser?.metadata.creationTime.substring(0, 22)}
                    </p>
                    <p className="date">
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="profile-data__icon"
                      />
                      마지막 접속 :{" "}
                      {currentUser?.metadata.lastSignInTime.substring(0, 22)}
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="profile-data__icon"
                      />

                      {myTwixxs.length === 0
                        ? "작성하신 트윅이 없네요😥"
                        : `내 트윅 (${myTwixxs.length})`}
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faReply}
                        className="profile-data__icon reply__icon"
                      />
                      {myReplys.length === 0
                        ? "작성하신 댓글이 없네요😥"
                        : `내 댓글 (${myReplys.length})`}
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
                {myTwixxs.length === 0 ? (
                  <button className="all-feeds-delete__button" disabled>
                    삭제할 트윅이 없습니다
                  </button>
                ) : (
                  <button
                    className="all-feeds-delete__button"
                    onClick={allFeedsDelete}
                  >
                    내 게시물 전부 삭제
                  </button>
                )}
                <button
                  className="withdrawal__button"
                  onClick={handleDeleteUser}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
            <div className="my-feed__wrapper">
              {myTwixxs.length !== 0 && <p className="header">트윅</p>}
              {myTwixxs && !loading ? (
                myTwixxs.map((twixx) => (
                  <FeedContainer
                    key={twixx.id}
                    photo={twixx.photo}
                    userName={twixx.userName}
                    userId={twixx.userId}
                    content={twixx.content}
                    createdAt={twixx.createdAt.substring(0, 21)}
                    editAt={twixx.editAt}
                    likeCount={twixx.like.length}
                    reTwixxCount={twixx.reTwixx}
                    handleEdit={() => {}}
                    handleDelete={() => {}}
                    id={twixx.id}
                  />
                ))
              ) : (
                <LoadingContainer />
              )}
              {myReplys.length !== 0 && (
                <p className="header reply__header">댓글</p>
              )}
              {myReplys && !loading ? (
                myReplys.map((reply) => (
                  <ReplyContainer
                    key={reply.id}
                    replyId={reply.replyId}
                    id={reply.id}
                    currentUserEmail={currentUser?.email}
                    avatar={reply.photo}
                    name={reply.userName}
                    email={reply.userId}
                    content={reply.content}
                    createdAt={reply.createdAt.substring(0, 21)}
                    editAt={reply.editAt}
                  />
                ))
              ) : (
                <LoadingContainer />
              )}
            </div>
          </div>
          <div className="sec__c">
            <Aside />
          </div>
        </div>
      </ProfileStyle>
      <AlertContainer
        animation={alertAnimation}
        alertContent={alertContent}
        display={display}
        backgroundColor={backgroundColor}
      />
    </>
  );
};

export default Profile;
