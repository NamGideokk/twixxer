import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Auth from "./Auth";
import Navigation from "components/Navigation";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { myFirestore } from "myFirebase";

const FormStyle = styled.div`
  .feed__form {
    width: 800px;
    height: fit-content;
    padding: 20px;
    margin: 100px auto;

    input {
      width: 100%;
      height: 50px;
      padding: 0 20px;
      border: none;
      border-radius: 10px;
      font-size: 24px;
      transition: 0.3s;
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

  .feed__container {
    width: 500px;
    height: fit-content;
    padding: 30px;
    background-color: white;
    margin: 30px auto;

    h2 {
      margin-bottom: 10px;
    }
  }
`;

const Home = () => {
  const currentUser = useAuth();
  const [getFeeds, setGetFeeds] = useState([
    { content: "로딩중...", id: "initial" },
  ]);
  const [feed, setFeed] = useState("");

  console.log(getFeeds);

  useEffect(
    () =>
      onSnapshot(collection(myFirestore, "feeds"), (snapshot) =>
        setGetFeeds(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

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
        const payload = { content: feed, createdAt: Date() };
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
    <>
      {currentUser ? (
        <>
          <Navigation />
          <FormStyle>
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
            {getFeeds.map((feed) => (
              <div key={feed.id} className="feed__container">
                <h2>{feed.content}</h2>
                <small>{feed?.createdAt}</small>
              </div>
            ))}
          </FormStyle>
          <Footer />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
