import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc } from "firebase/firestore";
import { myFirestore } from "myFirebase";
import { AlertCircleOutline } from "react-ionicons";

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

    ::before {
      content: "";
      background: linear-gradient(to top, rgb(30, 30, 30), transparent);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
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
  .user-email {
    display: inline-block;
    margin-bottom: 15px;
    color: var(--logo-dark-color);
    position: relative;
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
      transform: translate(-50px, 5px);
    }
  }

  /* 새 피드 알림 창 */
  .new-feed-alert__wrapper {
    position: fixed;
    left: 5%;
    bottom: 5%;
    width: fit-content;
    height: fit-content;
    display: flex;

    .alert__container {
      position: relative;
      width: fit-content;
      height: fit-content;
      background-color: var(--logo-dark-color);
      color: white;
      padding: 20px;
      border-radius: 10px;
      margin: 0 10px 0 10px;
      text-align: center;
      transition: 0.5s;
      box-shadow: 3px 3px 10px #b79aec inset, -3px -3px 7px #563692 inset;
      z-index: 99;

      .alert__icon {
        margin-bottom: 6px;
        display: inline-block;
      }
    }
  }
  /* 새 피드 알림 창 애니메이션 */
  .open-alert {
    animation: new-feed-alert 2s cubic-bezier(0.38, -0.55, 0.35, 1.33);
  }
  .close-alert {
    animation: close-new-feed-alert 2s forwards
      cubic-bezier(0.38, -0.55, 0.35, 1.33);
  }
`;

const FeedForm = () => {
  const currentUser = useAuth();

  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );
  const [feed, setFeed] = useState("");
  const [animation, setAnimation] = useState("");

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
      alert("내용을 입력해 주세요.");
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
          userId: currentUser.email,
          photo: currentUser.photoURL,
          content: feed,
          createdAt: Date(),
          like: 0,
        };
        await addDoc(collectionRef, payload);
        setFeed("");
        setAnimation("open-alert");
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
    const alertDiv = (
      <div className="alert__container">
        <AlertCircleOutline
          color={"white"}
          width="30px"
          height="30px"
          shake={true}
          className="alert__icon"
        />
        <p>새 트윅이 작성되었습니다</p>
      </div>
    );
  }

  return (
    <FeedFormStyle>
      <div className="user__wrapper">
        <img src={photoURL} alt="avatar" className="avatar" />
        <h1 className="user-email">{currentUser?.email}</h1>
        <form onSubmit={onSubmit} className="feed__form">
          <input
            type="text"
            placeholder="친구들과 소식을 공유하세요!"
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
      <div className="new-feed-alert__wrapper">
        <div className={`alert__container ${animation}`}>
          <AlertCircleOutline
            color={"white"}
            width="30px"
            height="30px"
            shake={true}
            className="alert__icon"
          />
          <p>새 트윅이 작성되었습니다</p>
        </div>
      </div>
    </FeedFormStyle>
  );
};

export default FeedForm;
