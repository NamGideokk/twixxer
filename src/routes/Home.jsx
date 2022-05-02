import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import Navigation from "components/Navigation";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { myFirestore } from "myFirebase";
import FeedForm from "components/FeedForm";
import Aside from "components/Aside";

import LoadingContainer from "common/LoadingContainer";
import FeedContainer from "components/FeedContainer";
import EmptyFeed from "common/EmptyFeed";

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
`;

const Home = () => {
  const currentUser = useAuth();
  const [getFeeds, setGetFeeds] = useState();
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectId, setSelectId] = useState();
  const [animation, setAnimation] = useState("");
  const [feedContAnimation, setFeedContAnimation] =
    useState("fc__open-animation");

  // 데이터(피드) 가져오기
  useEffect(() => {
    const collectionRef = collection(myFirestore, "feeds");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    setLoading(true);
    const unsub = onSnapshot(q, (snapshot) => {
      setGetFeeds(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });

    return unsub;
  }, []);

  // 피드 수정 모달창 열고 ID값 state에 저장
  function handleEdit(id) {
    setEdit(true);
    setAnimation("fec__open-animation");
    setSelectId(id);
    setTimeout(() => {
      setAnimation("");
    }, 500);
  }

  function handleEditContent(e) {
    setEditContent(e.target.value);
  }

  // // 피드 수정하기 클릭
  // async function editConfirm() {
  //   const docRef = doc(myFirestore, "feeds", selectId);
  //   const payload = {
  //     content: editContent,
  //     createdAt: Date(),
  //     editAt: "수정됨",
  //   };

  //   if (editContent.length === 0) {
  //     alert("내용을 입력해주세요");
  //   } else {
  //     await updateDoc(docRef, payload);
  //     setAnimation("fec__close-animation");
  //     setTimeout(() => {
  //       setEdit(false);
  //       setEditContent("");
  //     }, 500);
  //   }
  // }

  // 피드 수정하기 취소
  function editCancel(e) {
    setAnimation("fec__close-animation");
    setTimeout(() => {
      setEdit(false);
    }, 500);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    console.log(id);

    try {
      if (confirmDelete) {
        const docRef = doc(myFirestore, "feeds", id);
        setFeedContAnimation("delete__animation");

        await setTimeout(() => {
          deleteDoc(docRef);
          setFeedContAnimation("fc__open-animation");
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  // 화면 위로 이동 버튼
  function upButton() {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  }

  return (
    <>
      {currentUser ? (
        <>
          <MainFrameStyle>
            <div className="main__frame">
              <div className="sec__a">
                <Navigation />
              </div>
              <div className="sec__b">
                <FeedForm />
                <FormStyle>
                  <div className="feed__cont__wrapper">
                    {/* 피드 컨테이너 */}
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
                          likeCount={twixx.like.length}
                          reTwixxCount={twixx.reTwixx}
                          handleEdit={() => {}}
                          handleDelete={() => {}}
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
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
