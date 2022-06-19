import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleXmark,
  faHeart,
  faRepeat,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  faBookmark as borderBookmark,
  faComment,
  faHeart as borderHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

import {
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  collection,
  Timestamp,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { myFirestore, useAuth } from "myFirebase";
import AlertContainer from "common/AlertContainer";
import { BsReply } from "react-icons/bs";
import ReplyContainer from "./ReplyContainer";
import EditModal from "common/EditModal/EditModal";

const FeedContStyle = styled.div`
  .feed__container {
    width: 100%;
    height: fit-content;
    padding: 20px;
    background-color: rgb(30, 30, 30);
    color: #dcdcdc;
    transition: 0.3s;
    border: 1px solid #525252;
    display: grid;
    grid-template-columns: 60px 1fr 70px;
    grid-template-rows: 60px 1fr 20px 50px minmax(0, fit-content);
    grid-template-areas:
      "fc01 fc02 fc03"
      "fc04 fc04 fc04"
      "fc05 fc05 fc05"
      "fc06 fc06 fc06"
      "fc07 fc07 fc07" !important;

    .fc01 {
      grid-area: fc01;

      img {
        background-color: white;
      }
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

      div {
        padding-top: 6px;
      }
    }

    span {
      width: fit-content;
      padding: 7px;
      font-size: 17px;
      cursor: pointer;
      border-radius: 50%;
      transition: 0.3s;
      .fill-heart {
        color: #ff4444;

        animation: like-animation 1.2s;
      }
    }
    .count {
      padding: 0;
    }

    .heart__button {
      margin-right: 0 !important;
    }
    .lk__div {
      :hover {
        color: #ff4444;
      }
    }

    .lk__icon {
      width: 100px !important;
      height: 30px;
      text-align: center;

      :hover {
        color: #ff4444;
        background-color: #ff44442f;
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
    /* 북마크한(true) 아이콘 */
    .bookmark__icon {
      color: #5252ff;
    }
    .cm__icon {
      width: 30px;
      height: 30px;

      :hover {
        color: #14ad14;
        background-color: #40c9402f;
      }
    }
    .cm__div {
      :hover {
        color: #14ad14;
      }
    }
    .rp__div {
      :hover {
        color: #d000be;
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

  .fc07 {
    grid-area: fc07;
    width: 100%;
    height: fit-content;
    padding: 20px;
    background-color: rgb(30, 30, 30);
    color: #dcdcdc;
    transition: 0.3s;

    input {
      width: 100%;
      padding: 5px 10px 5px 40px;
      font-size: 16px;
      border: 1px solid #4f4f4f;
      background-color: rgb(30, 30, 30);
      transition: 0.3s;
      border-radius: 10px;

      :focus {
        background-color: #e9e9e9;
        box-shadow: 0 0 15px var(--logo-color);
      }
    }
    .reply__icon {
      font-size: 25px;
      position: absolute;
      color: var(--logo-dark-color);
      transform: rotate(180deg) translate(-7px, -5px);
    }
    .reply-count {
      padding-left: calc(100% / 15);
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 414px) {
    .feed__container {
      width: 100vw !important;
      margin: 0 !important;
      margin-right: 0 !important;
    }
    .feed-icons__wrapper {
      justify-content: space-between !important;
      width: 100% !important;
    }

    .fc07 {
      padding: 20px 0 10px 0 !important;
    }
    .reply-count {
      padding-left: 10px !important;
    }
  }

  /* 삭제 애니메이션 */
  .delete__animation {
    background-color: red !important;
    color: white;
    transform: scale(0);
    opacity: 0;
    transition: 1s !important;
  }
`;

// 수정 필요 사항 - 프로필 > 피드 수정 모달창 wrapper에 갇혀있음

const FeedContainer = ({
  photo,
  userName,
  userId,
  content,
  createdAt,
  editAt,
  likeCount,
  reTwixxCount,
  replyCount,
  like,
  bookmark,
  id,
}) => {
  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [selectId, setSelectId] = useState();
  const [animation, setAnimation] = useState("");
  const [iconAni, setIconAni] = useState("");
  const [feedContAnimation, setFeedContAnimation] =
    useState("fc__open-animation");
  const [reply, setReply] = useState("");
  const [twixxId, setTwixxId] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [getReplys, setGetReplys] = useState(null);
  const [replyInputError, setReplyInputError] = useState(false);
  const [inputErrorClass, setInputErrorClass] = useState("");

  // 좌측하단 알림창 state
  const [alertAnimation, setAlertAnimation] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [display, setDisplay] = useState("none");
  const [backgroundColor, setBackgroundColor] = useState("");

  const [deleteDisplay, setDeleteDisplay] = useState("");

  // 피드 수정 모달창 열고 ID값 state에 저장
  async function handleEdit(id) {
    const docRef = doc(myFirestore, "feeds", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEditContent(docSnap.data().content);
    }

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

  // 피드 수정하기 클릭
  function editConfirm() {
    const docRef = doc(myFirestore, "feeds", selectId);
    const payload = {
      content: editContent,
      createdAt: Date(),
      editAt: "수정됨",
    };

    if (editContent.length === 0) {
      alert("내용을 입력해주세요");
    } else {
      updateDoc(docRef, payload);
      setAnimation("fec__close-animation");
      setTimeout(() => {
        setEdit(false);
        setEditContent("");
        setAlertContent("트윅이 수정되었습니다.");
        setBackgroundColor("#ffb01f");
        setDisplay("block");
        if (window.screen.width <= 414) {
          setAlertAnimation("mobile-open-alert");
        } else {
          setAlertAnimation("open-alert");
        }
      }, 500);
      setTimeout(() => {
        newAlert();
      }, 1000);
    }
  }

  // 피드 수정하기 취소
  function editCancel(e) {
    setAnimation("fec__close-animation");
    setTimeout(() => {
      setEdit(false);
    }, 500);
  }

  // 피드 삭제하기
  async function handleDelete(id) {
    let confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    const docRef = doc(myFirestore, "feeds", id);

    if (confirmDelete) {
      try {
        setShowReply(false);
        setFeedContAnimation("delete__animation");
        setTimeout(() => {
          setAlertContent("트윅이 삭제되었습니다.");
          setBackgroundColor("#ff3535");
          setDisplay("block");
          if (window.screen.width <= 414) {
            setAlertAnimation("mobile-open-alert");
          } else {
            setAlertAnimation("open-alert");
          }
          console.log("hio");
        }, 500);
        setTimeout(() => {
          newAlert();
          setDeleteDisplay("none");
        }, 1000);
        await setTimeout(() => {
          deleteDoc(docRef);
        }, 6000);
      } catch (e) {
        console.log(e.code);
        alert(e.message);
      }
    }
  }

  // 피드 좋아요 버튼 클릭
  async function clickLike(id) {
    try {
      const docRef = doc(myFirestore, "feeds", id);
      const docSnap = await getDoc(docRef);
      let prevLike = docSnap.data().like;

      const isLike = prevLike.includes(currentUser.uid);

      // like 배열에 나의 uid가 있으면 (좋아요한 상태)
      if (isLike) {
        // like 배열에 나의 uid 삭제
        prevLike.forEach((uid, index) => {
          if (uid === currentUser.uid) {
            prevLike.splice(index, 1);
          }
        });
        const payload = {
          like: prevLike,
        };
        updateDoc(docRef, payload);
      } else {
        const payload = {
          like: [...prevLike, currentUser.uid],
        };

        updateDoc(docRef, payload);
      }
    } catch (e) {
      console.log(e.code);
      alert(e.message);
    }
  }

  // 북마크 버튼 클릭
  async function clickBookmark(userId, id) {
    if (userId === currentUser.email) {
      alert("회원님의 게시물입니다.");
    } else {
      try {
        const docRef = doc(myFirestore, "feeds", id);
        const docSnap = await getDoc(docRef);
        let prevBookmark = docSnap.data().bookmark;

        const isBookmark = prevBookmark.includes(currentUser.uid);

        // like 배열에 나의 uid가 있으면 (좋아요한 상태)
        if (isBookmark) {
          // like 배열에 나의 uid 삭제
          prevBookmark.forEach((uid, index) => {
            if (uid === currentUser.uid) {
              prevBookmark.splice(index, 1);
            }
          });
          const payload = {
            bookmark: prevBookmark,
          };
          updateDoc(docRef, payload);
        } else {
          const payload = {
            bookmark: [...prevBookmark, currentUser.uid],
          };

          updateDoc(docRef, payload);
        }
      } catch (e) {
        console.log(e.code);
        alert(e.message);
      }
    }
  }

  // 리트윅 버튼 클릭
  async function clickReTwixx(id) {
    setIconAni("re-twixx-animation");
    try {
      const docRef = doc(myFirestore, "feeds", id);
      const docSnap = await getDoc(docRef);
      let prevReTwixx = docSnap.data().reTwixx;

      await updateDoc(docRef, { reTwixx: prevReTwixx + 1 });
    } catch (e) {
      console.log(e.code);
      alert(e.message);
    }
    setIconAni("");
  }

  // 피드 생성 알림창
  function newAlert() {
    setTimeout(() => {
      if (window.screen.width <= 414) {
        setAlertAnimation("mobile-close-alert");
      } else {
        setAlertAnimation("close-alert");
      }
    }, 4000);
    setTimeout(() => {
      setAlertContent("");
      setDisplay("none");
      setBackgroundColor("");
      setAlertAnimation("");
    }, 5000);
  }

  // 댓글 아이콘 클릭
  const clickReply = useCallback(
    (id) => {
      setTwixxId(id);
      setShowReply(true);

      console.log("트윅 id - ", id);

      setLoading(true);

      const collectionRef = collection(myFirestore, "replys");
      const q = query(
        collectionRef,
        where("id", "==", id),
        orderBy("timestamp", "asc")
      );

      const unsub = onSnapshot(q, (snapshot) => {
        setGetReplys(
          snapshot.docs.map((doc) => ({ ...doc.data(), replyId: doc.id }))
        );
      });
      setLoading(false);
      return unsub;
    },
    [getReplys, twixxId]
  );

  // 댓글 submit
  async function replyOnSubmit(e) {
    e.preventDefault();

    if (reply.length === 0) {
      setReplyInputError(true);
      setInputErrorClass("red-color");
      setTimeout(() => {
        setReplyInputError(false);
        setInputErrorClass("");
      }, 3000);
    } else {
      try {
        const collectionRef = collection(myFirestore, "replys");
        const payload = {
          id: twixxId,
          userName: currentUser.displayName,
          userId: currentUser.email,
          photo: currentUser.photoURL,
          content: reply,
          createdAt: Date(),
          timestamp: Timestamp.fromDate(new Date()),
          like: [],
        };
        await addDoc(collectionRef, payload);
        setReply("");
        setTimeout(() => {
          setAlertContent("댓글이 작성되었습니다.");
          setBackgroundColor("#14ad14");
          setDisplay("block");
          if (window.screen.width <= 414) {
            setAlertAnimation("mobile-open-alert");
          } else {
            setAlertAnimation("open-alert");
          }
        }, 500);
        setTimeout(() => {
          newAlert();
        }, 1000);
      } catch (e) {
        console.log(e.code);
        alert(e.message);
      }
    }
  }

  return (
    <FeedContStyle>
      <div
        className={`feed__container ${feedContAnimation}`}
        style={{ display: deleteDisplay }}
      >
        <div className="fc01">
          <img src={photo} alt="avatar" />
        </div>
        <div className="fc02">
          <h2 className="name-email">{userName}</h2>
          <p className="name-email">{userId}</p>
        </div>
        <div className="fc03">
          {currentUser?.email === userId ? (
            <div className="writer__buttons">
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="edit__button"
                onClick={() => handleEdit(id)}
                title="수정하기"
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="delete__button"
                onClick={() => handleDelete(id)}
                title="삭제하기"
              />
            </div>
          ) : null}
        </div>
        <div className="fc04">
          <h3>{content}</h3>
        </div>
        <div className="fc05">
          <small>
            {createdAt}　{editAt}
          </small>
        </div>
        <div className="fc06">
          <div className="feed-icons__wrapper">
            <div className="lk__div">
              <span className="lk__icon">
                {like ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="heart__button fill-heart"
                    onClick={() => clickLike(id)}
                    title="좋아요 취소"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={borderHeart}
                    className="heart__button"
                    onClick={() => clickLike(id)}
                    title="좋아요"
                  />
                )}
              </span>
              <span className="count">{likeCount}</span>
            </div>
            <span className="bm__icon">
              {bookmark ? (
                <FontAwesomeIcon
                  icon={faBookmark}
                  onClick={() => clickBookmark(userId, id)}
                  className="bookmark__icon"
                  title="북마크 취소"
                />
              ) : (
                <FontAwesomeIcon
                  icon={borderBookmark}
                  onClick={() => clickBookmark(userId, id)}
                  title="북마크"
                />
              )}
            </span>
            <div className="cm__div">
              <span className="cm__icon">
                <FontAwesomeIcon
                  icon={faComment}
                  title="댓글"
                  onClick={
                    showReply
                      ? () => {
                          setShowReply(false);
                        }
                      : () => clickReply(id)
                  }
                />
              </span>
              {/* 댓글 갯수 바로 가져오게 수정 필요 */}
              <span className="count">{getReplys?.length}</span>
            </div>
            <div className="rp__div">
              <span className="rp__icon" onClick={() => clickReTwixx(id)}>
                <FontAwesomeIcon
                  icon={faRepeat}
                  className={iconAni}
                  title="리트윅"
                />
              </span>
              <span className="count">{reTwixxCount}</span>
            </div>
            <span className="sr__icon">
              <FontAwesomeIcon icon={faShareFromSquare} title="공유" />
            </span>
          </div>
        </div>
        {showReply && (
          <div className="fc07">
            <BsReply className="reply__icon" />
            <form onSubmit={replyOnSubmit}>
              <input
                type="text"
                className={inputErrorClass}
                placeholder={
                  replyInputError
                    ? "내용을 입력해 주세요"
                    : `${userName}님에게 답글을 남겨보세요`
                }
                minLength={1}
                maxLength={80}
                value={reply}
                onChange={(e) => {
                  setReply(e.target.value);
                }}
              />
            </form>
            {getReplys?.length !== 0 && (
              <p className="reply-count">댓글 ({getReplys?.length})</p>
            )}
            {/* 댓글 컨테이너 */}
            {getReplys
              ? getReplys.map((reply) => (
                  <ReplyContainer
                    key={reply.replyId}
                    replyId={reply.replyId}
                    id={reply.id}
                    currentUserEmail={currentUser?.email}
                    avatar={reply.photo}
                    name={reply.userName}
                    email={reply.userId}
                    content={reply.content}
                    createdAt={reply.createdAt.substring(0, 21)}
                    editAt={reply.editAt}
                  />
                ))
              : null}
          </div>
        )}
      </div>

      {edit && (
        // <EditContainerStyle>
        //   <div className="wrapper-st">
        //     <div className={`edit__container ${animation}`}>
        //       <textarea
        //         className="prev-content"
        //         value={editContent}
        //         onChange={handleEditContent}
        //       />
        //       <button onClick={editConfirm}>수정하기</button>
        //       <button onClick={editCancel}>취소</button>
        //     </div>
        //   </div>
        // </EditContainerStyle>
        <EditModal
          animation={animation}
          editContent={editContent}
          handleEditContent={handleEditContent}
          editConfirm={editConfirm}
          editCancel={editCancel}
        />
      )}
      <AlertContainer
        animation={alertAnimation}
        alertContent={alertContent}
        display={display}
        backgroundColor={backgroundColor}
      />
    </FeedContStyle>
  );
};

export default FeedContainer;
