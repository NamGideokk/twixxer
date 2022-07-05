import React, { useEffect, useState } from "react";
import "./feedForm.scss";
import NotificationContainer from "common/notificationContainer/NotificationContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  faChartBar,
  faClock,
  faFaceSmile,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { myFirestore, useAuth } from "myFirebase";
import useNotification from "customHook/useNotification";

const FeedForm = () => {
  const currentUser = useAuth();

  const [photoURL, setPhotoURL] = useState(
    "http://cdn.onlinewebfonts.com/svg/img_264570.png"
  );

  const [feed, setFeed] = useState("");
  const [errorClass, setErrorClass] = useState("");
  const [placeholder, setPlaceholder] = useState("친구들과 소식을 공유하세요!");

  const [animation, setAnimation] = useState("");
  const [display, setDisplay] = useState("");
  const [alertContent, setAlertContent] = useState("");

  useEffect(() => {
    // 현재 유저정보가 null이 아니고 (로그인 된 상태), photoURL이 null이 아니면
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  function onChange(e) {
    const {
      target: { value },
    } = e;
    setFeed(value);
  }

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
          photo: photoURL,
          content: feed,
          createdAt: Date(),
          timestamp: Timestamp.fromDate(new Date()),
          like: [],
          bookmark: [],
          reTwixx: 0,
        };
        await addDoc(collectionRef, payload);
        setFeed("");

        // 알림창 애니메이션
        // setTimeout(() => {
        //   setAlertContent("새 트윅이 작성되었습니다.");
        //   setDisplay("block");
        //   if (window.screen.width <= 414) {
        //     setAnimation("mobile-open-alert");
        //   } else {
        //     setAnimation("open-alert");
        //   }
        // }, 500);
        // setTimeout(() => {
        //   newFeedAlert();
        // }, 1000);
      } catch (e) {
        console.log(e.code);
        alert(e.message);
      }
    }
  }

  // 피드 생성 알림창
  // function newFeedAlert() {
  //   setTimeout(() => {
  //     if (window.screen.width <= 414) {
  //       setAnimation("mobile-close-alert");
  //     } else {
  //       setAnimation("close-alert");
  //     }
  //   }, 4000);
  //   setTimeout(() => {
  //     setAnimation("");
  //     setAlertContent("");
  //     setDisplay("none");
  //   }, 5000);
  // }

  return (
    <>
      <form onSubmit={onSubmit} className="feed__form">
        <textarea
          // type="text"
          className={errorClass}
          placeholder={placeholder}
          maxLength={120}
          value={feed}
          onChange={onChange}
        />
        <button type="submit" className="upload-feed__button">
          <FontAwesomeIcon icon={faPaperPlane} className="upload-feed__icon" />
        </button>
        <div className="btns">
          <label htmlFor="img-input" className="img-input__button">
            <FontAwesomeIcon icon={faImage} />
          </label>
          <FontAwesomeIcon icon={faFaceSmile} className="emoji__button" />
          <FontAwesomeIcon icon={faChartBar} className="vote__button" />
          <FontAwesomeIcon icon={faClock} className="reservation__button" />
          <input
            id="img-input"
            type="file"
            accept="image"
            style={{ display: "none" }}
          />
        </div>
      </form>
      <NotificationContainer
        animation={animation}
        alertContent={alertContent}
        display={display}
      />
    </>
  );
};

export default FeedForm;
