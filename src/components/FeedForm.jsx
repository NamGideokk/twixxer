import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc } from "firebase/firestore";
import { myFirestore } from "myFirebase";

const FeedFormStyle = styled.div`
  .empty__div {
    width: 700px;
  }

  .user__wrapper {
    // 너비 수정 필요
    width: 700px;
    height: fit-content;
    background-color: rgba(30, 30, 30, 0.7);
    backdrop-filter: blur(10px);
    padding: 20px 20px;
    position: fixed;
    top: 0;
    z-index: 99;
    background-image: url("data:image/jpeg;base64,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");
    background-repeat: no-repeat;
    background-size: cover;

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
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: white;
    object-fit: cover;
    margin-right: 20px;
    position: relative;
  }
  .user-email {
    display: inline-block;
    margin-bottom: 15px;
    /* color: var(--logo-dark-color); */
    position: relative;
  }

  .feed__form {
    width: 100%;
    height: fit-content;

    input {
      width: 100%;
      height: 50px;
      padding: 0 20px;
      border: none;
      border-radius: 10px;
      font-size: 24px;
      transition: 0.5s;
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
      <>
        <div className="empty__div"></div>
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
      </>
    </FeedFormStyle>
  );
};

export default FeedForm;
