import React, { useCallback, useState } from "react";
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
import NotificationContainer from "common/notificationContainer/NotificationContainer";
import { BsReply } from "react-icons/bs";
import ReplyContainer from "../ReplyContainer/ReplyContainer";
import EditModal from "common/editModal/EditModal";
import "./feedContainer.scss";
import { useContext } from "react";
import { LanguageContext } from "context/LanguageContext";

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
  const { isKor } = useContext(LanguageContext);
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
    if (isKor) {
      let confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    }
    let confirmDelete = window.confirm("Are you sure you want to delete?");
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
    <>
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
                title={isKor ? "수정하기" : "Edit"}
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="delete__button"
                onClick={() => handleDelete(id)}
                title={isKor ? "삭제하기" : "Delete"}
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
                    title={isKor ? "좋아요 취소" : "Unlike"}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={borderHeart}
                    className="heart__button"
                    onClick={() => clickLike(id)}
                    title={isKor ? "좋아요" : "Like"}
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
                  title={isKor ? "북마크 취소" : "Unbookmark"}
                />
              ) : (
                <FontAwesomeIcon
                  icon={borderBookmark}
                  onClick={() => clickBookmark(userId, id)}
                  title={isKor ? "북마크" : "Bookmark"}
                />
              )}
            </span>
            <div className="cm__div">
              <span className="cm__icon">
                <FontAwesomeIcon
                  icon={faComment}
                  title={isKor ? "댓글" : "Reply"}
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
                  title={isKor ? "리트윅" : "Re-twixx"}
                />
              </span>
              <span className="count">{reTwixxCount}</span>
            </div>
            <span className="sr__icon">
              <FontAwesomeIcon
                icon={faShareFromSquare}
                title={isKor ? "공유" : "Share"}
              />
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
            {getReplys &&
              getReplys.map((reply) => (
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
              ))}
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
      <NotificationContainer
        animation={alertAnimation}
        alertContent={alertContent}
        display={display}
        backgroundColor={backgroundColor}
      />
    </>
  );
};

export default FeedContainer;
