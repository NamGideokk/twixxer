import React, { useEffect, useRef, useState } from "react";
import Auth from "./Auth";
import Navigation from "components/Navigation";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faHeart,
  faPen,
  faRepeat,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { myFirestore } from "myFirebase";
import FeedForm from "components/FeedForm";
import Aside from "components/Aside";
import {
  faBookmark,
  faComment,
  faHeart as borderHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import Loading from "common/Loading";

const FormStyle = styled.div`
  .feed__cont__wrapper {
    margin-top: 220px;
  }
  .feed__container {
    /* width: 555px; */
    width: 100%;
    height: fit-content;
    padding: 20px 40px;
    background-color: rgb(30, 30, 30);
    color: #dcdcdc;
    margin: 0 auto;
    transition: 0.3s;
    border: 1px solid #525252;
    animation: go-up 0.5s;

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 50%;
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

    .feed-icons__wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
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

  .prev-content {
    width: 100%;
    height: 50px;
  }
`;

const EditContainerStyle = styled.div`
  .edit__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: fit-content;
    padding: 20px;
    background-color: var(--logo-color);
    margin: 30px auto;
    transition: 0.3s;

    animation: showing 0.6s;

    textarea {
      width: 100%;
      height: fit-content;
      resize: none;
      font-size: 20px;
      padding: 10px;

      :focus {
        outline: none;
      }
    }
  }
`;

const MainFrameStyle = styled.div`
  .main__frame {
    display: flex;
    max-width: 1500px;
    width: 100%;
    height: 100vh;
    margin: 0 auto;

    .sec__a {
      width: fit-content;
      padding: 0 20px;
    }
    .sec__b {
      /* flex-grow: 2; */
      width: fit-content;
      height: fit-content;
      padding-bottom: 100px;
    }

    .sec__c {
      /* background-color: green; */
      flex-grow: 1;
      padding: 0 20px;
    }
  }
`;

const Home = () => {
  const currentUser = useAuth();
  const [getFeeds, setGetFeeds] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);

  const feedCont = useRef();

  // 데이터(피드) 가져오기
  useEffect(() => {
    const collectionRef = collection(myFirestore, "feeds");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setGetFeeds(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );

    return unsub;
  }, []);

  function handleEdit(id) {
    setEdit(true);
    const docRef = doc(myFirestore, "feeds", id);
    const payload = {
      userId: currentUser.email,
      photo: currentUser.photoURL,
      content: "수정했어요 수정됨",
      createdAt: Date(),
    };
    setDoc(docRef, payload);
  }

  function handleEditContent(e) {
    setEditContent(e.target.value);
  }

  function editConfirm() {}

  async function handleDelete(id) {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

    if (confirmDelete) {
      const docRef = doc(myFirestore, "feeds", id);

      // 삭제 애니메이션
      feedCont.current.style =
        "background-color: red; color: white; transform: translate(200px,-5px); opacity: 0; transition: 1s;";

      await setTimeout(() => {
        deleteDoc(docRef);
        feedCont.current.style = "display:none;";
      }, 1000);
    }
  }

  // 화면 위로 이동 버튼
  function upButton() {
    window.scroll({
      behavior: "smooth",
      top: 0,
    });
  }

  // 피드 좋아요 버튼 클릭
  function clickLike(e) {
    setLike(!like);
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
                    {getFeeds ? (
                      getFeeds.map((feed) => (
                        <div
                          key={feed.id}
                          className="feed__container"
                          ref={feedCont}
                        >
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
                          <h3>{feed.content}</h3>
                          <small>{feed.createdAt.substring(0, 21)}</small>
                          <div className="feed-icons__wrapper">
                            <span className="lk__icon">
                              {like ? (
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className="heart__button fill-heart"
                                  onClick={clickLike}
                                  title="좋아요 취소"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={borderHeart}
                                  className="heart__button"
                                  onClick={clickLike}
                                  title="좋아요"
                                />
                              )}
                              3029
                            </span>
                            <span className="bm__icon">
                              <FontAwesomeIcon
                                icon={faBookmark}
                                title="북마크"
                              />
                            </span>
                            <span className="cm__icon">
                              <FontAwesomeIcon icon={faComment} title="댓글" />
                            </span>
                            <span className="rp__icon">
                              <FontAwesomeIcon icon={faRepeat} title="리트윅" />
                            </span>
                            <span className="sr__icon">
                              <FontAwesomeIcon
                                icon={faShareFromSquare}
                                title="공유"
                              />
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Loading />
                    )}
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
      {edit && (
        <EditContainerStyle>
          <div className="wrapper-st">
            <div className="edit__container">
              <textarea
                className="prev-content"
                value={editContent}
                onChange={handleEditContent}
              />
              <button onClick={editConfirm}>수정하기</button>
              <button
                onClick={() => {
                  setEdit(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        </EditContainerStyle>
      )}
    </>
  );
};

export default Home;
