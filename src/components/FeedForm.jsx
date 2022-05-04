import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc } from "firebase/firestore";
import { myFirestore } from "myFirebase";
import AlertContainer from "common/AlertContainer";

const FeedFormStyle = styled.div`
  .user__wrapper {
    // 너비 수정 필요
    width: 100%;
    height: fit-content;
    background-color: rgba(30, 30, 30, 0.7);
    backdrop-filter: blur(10px);
    padding: 20px 20px;
    position: sticky;
    top: 0;
    z-index: 99;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
    margin-right: 20px;
    position: relative;
  }
  .name-email__wrapper {
    width: fit-content;
    height: fit-content;
    display: inline-block;
    margin-bottom: 15px;
  }
  .user-email {
    color: var(--logo-dark-color);
    position: relative;
  }
  .name {
    font-size: 40px;
  }

  .feed__form {
    width: 100%;
    height: fit-content;

    input {
      width: 100%;
      height: 50px;
      padding: 0 55px 0 20px;
      border: none;
      border-radius: 10px;
      font-size: 24px;
      transition: 0.2s;
      background-color: #e1e1e1;
      position: relative;

      :focus {
        background-color: white;
        box-shadow: 0 0 15px var(--logo-color);
      }
    }

    button {
      font-size: 30px;
      padding: 5px;
      background-color: transparent;
      color: var(--logo-color);
      position: absolute;
      transform: translate(-50px, 2px);
    }
  }

  /* 새 피드 알림 창 애니메이션 */
  .open-alert {
    display: block;
    animation: new-feed-alert 1.5s;
    /* cubic-bezier(0.38, -0.55, 0.35, 1.33) */
  }
  .close-alert {
    animation: close-new-feed-alert 1.5s forwards;
    /* cubic-bezier(0.38, -0.55, 0.35, 1.33) */
  }

  .block {
    display: block !important;
  }
  .none {
    display: none;
  }

  .red-color {
    transition: 0.5s !important;
    border: 1px solid #ff2929 !important;
    box-shadow: 0 0 15px #ff5656 !important;

    ::placeholder {
      transition: 0.5s;
      color: #ff2929;
    }
  }

  @media screen and (max-width: 414px) {
    .user__wrapper {
      // 너비 수정 필요
      width: 100% !important;
      height: fit-content;
      background-color: rgba(30, 30, 30, 0.7);
      backdrop-filter: blur(10px);
      padding: 20px 20px;
      position: fixed !important;
      top: 0 !important;
      z-index: 20;
    }
  }
`;

const FeedForm = () => {
  const currentUser = useAuth();

  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );
  const [feed, setFeed] = useState("");
  const [animation, setAnimation] = useState("");
  const [display, setDisplay] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [placeholder, setPlaceholder] = useState("친구들과 소식을 공유하세요!");
  const [errorClass, setErrorClass] = useState("");

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  // 피드 작성
  async function onSubmit(e) {
    e.preventDefault();
    if (feed.length === 0) {
      setPlaceholder("내용을 입력해 주세요");
      setErrorClass("red-color");
      setTimeout(() => {
        setErrorClass("");
        setPlaceholder("친구들과 소식을 공유하세요!");
      }, 3000);
    } else {
      // doc 이름, ID
      // const docRef = doc(myFirestore, "feeds", "feed001");
      // const payload = { content: feed };
      // await setDoc(docRef, payload);
      // alert("피드 작성!");

      // 세번째 인자값 (id?)를 비워두면 자동랜덤 생성?
      try {
        const collectionRef = collection(myFirestore, "feeds");
        const payload = {
          userName: currentUser.displayName,
          userId: currentUser.email,
          photo: currentUser.photoURL,
          content: feed,
          createdAt: Date(),
          like: [],
          reTwixx: 0,
        };
        await addDoc(collectionRef, payload);
        setFeed("");
        setTimeout(() => {
          setAlertContent("새 트윅이 작성되었습니다.");
          setDisplay("block");
          setAnimation("open-alert");
        }, 500);
        setTimeout(() => {
          newFeedAlert();
        }, 1000);
      } catch (e) {
        console.log(e.code);
        alert(e.message);
      }
    }
  }

  function onChange(e) {
    const {
      target: { value },
    } = e;
    setFeed(value);
  }

  // 피드 생성 알림창
  function newFeedAlert() {
    setTimeout(() => {
      setAnimation("close-alert");
    }, 4000);
    setTimeout(() => {
      setAlertContent("");
      setDisplay("none");
    }, 5000);
  }

  return (
    <FeedFormStyle>
      <div className="user__wrapper">
        <img src={photoURL} alt="avatar" className="avatar" />
        <div className="name-email__wrapper">
          <h1 className="user-email name">{currentUser?.displayName}</h1>
          <h1 className="user-email">{currentUser?.email}</h1>
        </div>
        <form onSubmit={onSubmit} className="feed__form">
          <input
            type="text"
            className={errorClass}
            placeholder={placeholder}
            maxLength={120}
            value={feed}
            onChange={onChange}
          />

          <button type="submit" className="upload-feed__button">
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="upload-feed__icon"
            />
          </button>
        </form>
      </div>
      <AlertContainer
        animation={animation}
        alertContent={alertContent}
        display={display}
      />
    </FeedFormStyle>
  );
};

export default FeedForm;
