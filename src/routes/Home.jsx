import React, { useEffect, useRef, useState } from "react";
import Auth from "./Auth";
import Navigation from "components/Navigation";
import { useAuth } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faCirclePlus,
  faCircleXmark,
  faHeart,
  faRepeat,
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
    /* margin-top: 220px; */
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
    animation: go-up 0.5s;
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
      padding-top: 18px;
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

    h2 {
      display: inline-block;
      margin-left: 20px;
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

  /* 삭제 애니메이션 */
  .delete__animation {
    background-color: red;
    color: white;
    transform: translate(200px, -5px);
    opacity: 0;
    transition: 1s;
  }
`;

const EditContainerStyle = styled.div`
  .edit__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    padding: 20px;
    background-color: var(--logo-color);
    border-radius: 20px;
    margin: 30px auto;
    transition: 0.3s;

    animation: showing 0.6s;

    textarea {
      width: 100%;
      height: 80%;
      resize: none;
      font-size: 20px;
      padding: 10px;
      border: none;

      :focus {
        outline: none;
      }
    }

    button {
      margin-top: 30px;
      width: 50%;
      font-size: 20px;
      border-top: 1px solid white;
      background-color: transparent;
      padding: 15px 0;
      color: white;

      :nth-of-type(1) {
        border-right: 1px solid white;
      }
    }
  }
`;

const MainFrameStyle = styled.div`
  .main__frame {
    display: flex;
    max-width: 1500px;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;

    .sec__a {
      width: fit-content;
      width: 300px;
    }
    .sec__b {
      height: fit-content;
      padding-bottom: 100px;
      min-width: 500px;
      padding: 0 20px;
    }

    .sec__c {
      width: 380px;
    }
  }
`;

const Home = () => {
  const currentUser = useAuth();
  const [getFeeds, setGetFeeds] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectId, setSelectId] = useState();

  const feedCont = useRef();

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
    setSelectId(id);
  }

  function handleEditContent(e) {
    setEditContent(e.target.value);
  }

  // 피드 수정하기 클릭
  function editConfirm() {
    const docRef = doc(myFirestore, "feeds", selectId);
    const payload = {
      userId: currentUser.email,
      photo: currentUser.photoURL,
      content: editContent,
      createdAt: Date(),
    };

    if (editContent.length === 0) {
      alert("내용을 입력해주세요");
    } else {
      setDoc(docRef, payload);
      setEdit(false);
      setEditContent("");
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    console.log(id);

    try {
      if (confirmDelete) {
        const docRef = doc(myFirestore, "feeds", id);

        // 삭제 애니메이션 에러...
        feedCont.current.className += " delete__animation";
        await setTimeout(() => {
          deleteDoc(docRef);
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
                    {/* 피드 컨테이너 */}
                    {getFeeds ? (
                      getFeeds.map((feed) => (
                        <div
                          className="feed__container"
                          key={feed.id}
                          ref={feedCont}
                        >
                          <div className="fc01">
                            <img src={feed.photo} alt="avatar" />
                          </div>
                          <div className="fc02">
                            <h2>{feed.userId}</h2>
                          </div>
                          <div className="fc03">
                            {currentUser?.email === feed.userId ? (
                              <div className="writer__buttons">
                                <FontAwesomeIcon
                                  icon={faCirclePlus}
                                  className="edit__button"
                                  onClick={() => handleEdit(feed.id)}
                                  title="수정하기"
                                />
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  className="delete__button"
                                  onClick={() => handleDelete(feed.id)}
                                  title="삭제하기"
                                />
                              </div>
                            ) : null}
                          </div>
                          <div className="fc04">
                            <h3>{feed.content}</h3>
                          </div>
                          <div className="fc05">
                            <small>{feed.createdAt.substring(0, 21)}</small>
                          </div>
                          <div className="fc06">
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
                                <FontAwesomeIcon
                                  icon={faComment}
                                  title="댓글"
                                />
                              </span>
                              <span className="rp__icon">
                                <FontAwesomeIcon
                                  icon={faRepeat}
                                  title="리트윅"
                                />
                              </span>
                              <span className="sr__icon">
                                <FontAwesomeIcon
                                  icon={faShareFromSquare}
                                  title="공유"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Loading />
                    )}
                    {/* 피드 컨테이너 끝 */}
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
