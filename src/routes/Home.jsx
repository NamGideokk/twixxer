import React, { useEffect, useState } from "react";
import Nav from "components/Nav/Nav";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDocs,
  where,
} from "firebase/firestore";
import { myFirestore } from "myFirebase";
import FeedForm from "components/FeedForm";
import Aside from "components/Aside";

import LoadingContainer from "common/LoadingContainer";
import FeedContainer from "components/FeedContainer";
import EmptyFeed from "common/EmptyFeed";
import Loading from "common/Loading/Loading";
import SetName from "components/SetName";
import { useNavigate } from "react-router-dom";

const FormStyle = styled.div`
  .feed__cont__wrapper {
  }
  .feed__container {
    /* width: 555px; */
    width: 100%;
    height: fit-content;
    padding: 20px;
    background-color: rgb(30, 30, 30);
    color: #dcdcdc;
    margin: 0 auto;
    transition: 0.3s;
    border: 1px solid #525252;
    display: grid;
    grid-template-columns: 60px 1fr 70px;
    grid-template-rows: 60px 1fr 20px 50px;
    grid-template-areas:
      "fc01 fc02 fc03"
      "fc04 fc04 fc04"
      "fc05 fc05 fc05"
      "fc06 fc06 fc06";

    .fc01 {
      grid-area: fc01;
    }
    .fc02 {
      grid-area: fc02;
      padding-top: 5px;

      p {
        color: #717171;
      }
    }
    .fc03 {
      grid-area: fc03;
    }
    .fc04 {
      grid-area: fc04;
      padding-top: 20px;
      padding-bottom: 10px;
    }
    .fc05 {
      grid-area: fc05;
    }
    .fc06 {
      grid-area: fc06;
      padding-top: 20px;
    }

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
    }

    .name-email {
      margin-left: 20px;
      margin-right: 50px;
      margin-bottom: 3px;
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

    .feed-icons__wrapper {
      display: flex;
      justify-content: space-between;
    }

    span {
      text-align: center;
      width: fit-content;
      padding: 7px;
      font-size: 17px;
      cursor: pointer;
      border-radius: 50%;
      transition: 0.3s;

      .heart__button {
        margin-right: 5px;
      }
      .fill-heart {
        color: #ff4444;
      }
    }

    .bm__icon {
      width: 30px;
      height: 30px;

      :hover {
        color: #5252ff;
        background-color: #5252ff2f;
      }
    }
    .cm__icon {
      width: 30px;
      height: 30px;

      :hover {
        color: #14ad14;
        background-color: #40c9402f;
      }
    }
    .rp__icon {
      width: 30px;
      height: 30px;

      :hover {
        color: #d000be;
        background-color: #d000be2f;
      }
    }
    .sr__icon {
      width: 30px;
      height: 30px;
      :hover {
        color: #d48e0e;
        background-color: #f0b4432f;
      }
    }

    .writer__buttons {
      text-align: right;
      font-size: 20px;
    }
  }
  .edit__button {
    margin-right: 10px;
    color: #ffb01f95;
  }

  .edit__button,
  .delete__button {
    cursor: pointer;
    transition: 0.3s;

    :hover {
      color: #ffb01f;
      transform: rotate(180deg);
    }
  }
  .delete__button {
    color: #ff353595;
    :hover {
      color: #ff3535;
    }
  }

  .prev-content {
    width: 100%;
    height: 50px;
  }
`;

const MainFrameStyle = styled.div`
  .main__frame {
    display: grid;
    grid-template-columns: 300px minmax(500px, 820px) minmax(300px, 380px);
    grid-template-rows: 1fr;
    grid-template-areas: "a b c";
    max-width: 1500px;
    margin: 0 auto;

    .sec__a {
      grid-area: a;
      z-index: 90;
    }
    .sec__b {
      grid-area: b;
      padding-bottom: 100px;
      min-width: 500px;
      padding: 0 20px;
      padding-bottom: 100px;
    }

    .sec__c {
      grid-area: c;
      max-width: 380px;
      min-width: 300px;
    }
  }

  @media screen and (max-width: 1280px) and (min-width: 821px) {
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
      grid-template-columns: 1fr !important;
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
      padding: 0 !important;
    }
    .sec__b {
      width: 100vw !important;
      min-width: 100vw !important;
      padding: 0 !important;
      margin: 190px 0 30px 0 !important;
    }
    .sec__c {
      width: 0 !important;
      display: none;
    }
  }
`;

const Home = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const [getFeeds, setGetFeeds] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);

  // 데이터(피드) 가져오기
  useEffect(() => {
    setLoading(true);
    console.log("모든 피드 불러오기 작업 실행");
    const collectionRef = collection(myFirestore, "feeds");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setGetFeeds(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          isLike: doc.data().like.includes(currentUser.uid),
          isBookmark: doc.data().bookmark.includes(currentUser.uid),
        }))
      );
    });

    setLoading(false);

    return unsub;
  }, [currentUser]);

  useEffect(() => {
    setLoading(true);
    setName(currentUser?.displayName);
    setLoading(false);
  }, [currentUser?.displayName, name]);

  useEffect(() => {
    if (currentUser === null && currentUser !== undefined) {
      navigate("/login");
    }
  }, [currentUser]);

  // 화면 위로 이동 버튼
  function upButton() {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  }

  console.log(getFeeds);

  return (
    <>
      <MainFrameStyle>
        <div className="main__frame">
          <div className="sec__a">
            <Nav />
          </div>
          <div className="sec__b">
            <FeedForm />
            <FormStyle>
              <div className="feed__cont__wrapper">
                {getFeeds ? (
                  getFeeds.map((twixx) => (
                    <FeedContainer
                      key={twixx.id}
                      photo={twixx.photo}
                      userName={twixx.userName}
                      userId={twixx.userId}
                      content={twixx.content}
                      createdAt={twixx.createdAt.substring(0, 21)}
                      editAt={twixx.editAt}
                      like={twixx.isLike}
                      likeCount={twixx.like.length}
                      bookmark={twixx.isBookmark}
                      reTwixxCount={twixx.reTwixx}
                      id={twixx.id}
                    />
                  ))
                ) : (
                  <>
                    <LoadingContainer />
                    <LoadingContainer />
                    <LoadingContainer />
                  </>
                )}
                {getFeeds?.length === 0 && <EmptyFeed />}
              </div>
            </FormStyle>
          </div>
          <div className="sec__c">
            <Aside />
          </div>
        </div>
      </MainFrameStyle>

      <FontAwesomeIcon
        icon={faArrowUp}
        className="up__button"
        title="맨 위로 이동"
        onClick={upButton}
      />

      {name === null && name !== undefined ? <SetName /> : null}
      {loading && <Loading />}
    </>
  );
};

export default Home;
