import React, { useEffect, useState } from "react";
import Nav from "components/nav/Nav";
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
import Header from "components/header/Header";
import FeedForm from "components/header/FeedForm";
import Aside from "components/aside/Aside";
import LoadingContainer from "common/LoadingContainer";
import FeedContainer from "components/feedContainer/FeedContainer";
import EmptyFeed from "common/EmptyFeed";
import Loading from "common/loading/Loading";
import SetName from "components/SetName";
import { useNavigate } from "react-router-dom";
import MainFrame from "layouts/MainFrame";
import { useDispatch } from "react-redux";
import { getFeeds } from "reduxStore/feed/feedSlice";
import { useSelector } from "react-redux";
import { setActiveUser, setLogoutUser } from "../reduxStore/user/userSlice";
import useGetTwixxs from "customHook/useGetTwixxs";

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

const Home = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getFeeds, setGetFeeds] = useState();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);

  const { user } = useSelector((store) => store);

  if (!user.isLoggedIn) {
    navigate("/login");
  }

  useEffect(() => {
    console.log("Home component rendering");
  }, []);

  useEffect(() => {
    if (user.isLoggedIn) {
      dispatch(
        setActiveUser({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        })
      );
    } else {
      dispatch(setLogoutUser());
    }
  }, []);

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
          isLike: doc.data().like.includes(user.uid),
          isBookmark: doc.data().bookmark.includes(user.uid),
        }))
      );
    });
    setLoading(false);
  }, []);

  //   setLoading(false);

  //   return unsub;
  // }, [currentUser]);

  // 계정 displayName 검사
  // useEffect(() => {
  //   setLoading(true);
  //   setName(currentUser?.displayName);
  //   setLoading(false);
  // }, [currentUser?.displayName, name]);

  // useEffect(() => {
  //   if (currentUser === null && currentUser !== undefined) {
  //     navigate("/login");
  //   }
  // }, [currentUser]);

  // 화면 위로 이동 버튼
  function upButton() {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  }

  return (
    <>
      <MainFrame
        secA={<Nav />}
        secB={
          <>
            <Header />
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
          </>
        }
        secC={<Aside />}
      />

      <FontAwesomeIcon
        icon={faArrowUp}
        className="up__button"
        title="맨 위로 이동"
        onClick={upButton}
      />

      {/* {name === null && name !== undefined ? <SetName /> : null} */}
      {loading && <Loading />}
    </>
  );
};

export default Home;
