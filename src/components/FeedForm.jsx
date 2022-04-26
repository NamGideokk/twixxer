import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc } from "firebase/firestore";
import { myFirestore } from "myFirebase";

const FeedFormStyle = styled.div`
  .user__wrapper {
    // 너비 수정 필요
    width: 775px;
    height: fit-content;
    background-color: rgba(192, 75, 255, 0.7);
    backdrop-filter: blur(15px);
    padding: 20px 20px;
    margin: 0 auto 20px auto;
    position: fixed;
    top: 0;
  }
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
    margin-right: 20px;
  }
  .user-email {
    display: inline-block;
    margin-bottom: 20px;
  }

  .feed__form {
    width: 100%;
    height: fit-content;

    input {
      width: 570px;
      height: 50px;
      padding: 0 20px;
      border: none;
      border-radius: 10px;
      font-size: 24px;
      transition: 0.5s;
      background-color: #eeeeee;

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
`;

const FeedForm = () => {
  const currentUser = useAuth();

  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );
  const [feed, setFeed] = useState("");

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
        };
        await addDoc(collectionRef, payload);
        setFeed("");
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
    </FeedFormStyle>
  );
};

export default FeedForm;
