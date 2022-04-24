import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Auth from "./Auth";
import Navigation from "components/Navigation";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { myFirestore } from "myFirebase";

const FormStyle = styled.div`
  .feed__form {
    width: 700px;
    height: fit-content;
    padding: 20px;
    margin: 100px auto;
    text-align: center;

    input {
      width: 55%;
      height: 50px;
      padding: 0 20px;
      border: none;
      border-radius: 10px;
      font-size: 24px;
      transition: 0.5s;
      background-color: #eeeeee;

      :focus {
        width: 100%;
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
    padding: 20px;
    background-color: var(--logo-color);
    margin: 30px auto;
    transition: 0.3s;

    :hover {
      transform: translateY(-5px);
      background-color: var(--logo-dark-color);
    }

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid var(--logo-color);
    }

    h2 {
      display: inline-block;
      margin-left: 10px;
      margin-bottom: 10px;
      margin-right: 50px;
    }

    h3 {
      margin-bottom: 10px;
    }

    .feed-menu__button {
      margin-left: 20px;
      transition: 0.3s;

      :hover {
        color: white;
      }
    }
  }
  .edit__button {
    margin-right: 10px;
  }

  .edit__button,
  .delete__button {
    cursor: pointer;
    transition: 0.3s;

    :hover {
      color: white;
    }
  }
  .delete__button:hover {
    color: red;
  }
`;

const Home = () => {
  const currentUser = useAuth();
  const [getFeeds, setGetFeeds] = useState([
    { content: "로딩중...", createdAt: "로딩중...", id: "initial" },
  ]);
  const [feed, setFeed] = useState("");
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(feed.content);

  // 데이터(피드) 가져오기
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

  function handleEdit(id) {
    const docRef = doc(myFirestore, "feeds", id);
    const payload = {
      userId: currentUser.email,
      photo: currentUser.photoURL,
      content: "수정했어요 수정됨",
      createdAt: Date(),
    };
    setDoc(docRef, payload);
  }
  async function handleDelete(id) {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

    if (confirmDelete) {
      const docRef = doc(myFirestore, "feeds", id);
      await deleteDoc(docRef);
    }
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
                <img src={feed.photo} alt="avatar" />
                <h2>{feed.userId}</h2>
                {currentUser?.email === feed.userId ? (
                  <>
                    <FontAwesomeIcon
                      icon={faPen}
                      className="edit__button"
                      onClick={() => handleEdit(feed.id)}
                      title="수정하기"
                    />
                    <FontAwesomeIcon
                      icon={faX}
                      className="delete__button"
                      onClick={() => handleDelete(feed.id)}
                      title="삭제하기"
                    />
                  </>
                ) : null}
                {edit ? (
                  <textarea
                    value={editContent}
                    onChange={setEditContent(editContent)}
                  />
                ) : (
                  <h3>{feed.content}</h3>
                )}
                <small>{feed.createdAt.substring(0, 21)}</small>
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
