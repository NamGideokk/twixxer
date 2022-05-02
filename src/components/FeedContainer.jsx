import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleXmark,
  faHeart,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

import {
  faBookmark,
  faComment,
  faHeart as borderHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";

import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  deleteField,
  collection,
  getDocs,
} from "firebase/firestore";
import { myFirestore, useAuth } from "myFirebase";
import { getSuggestedQuery } from "@testing-library/react";

const FeedContStyle = styled.div`
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
`;

const EditContainerStyle = styled.div`
  .edit__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    padding: 40px 20px;
    background-color: var(--logo-color);
    border-radius: 20px;
    margin: 30px auto;
    transition: 0.3s;
    text-align: center;

    textarea {
      width: 90%;
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
      margin-top: 20px;
      width: 40%;
      font-size: 20px;
      background-color: var(--logo-dark-color);
      padding: 10px 0;
      color: white;
      transition: 0.3s;

      :nth-of-type(1) {
        margin-right: 10%;
      }

      :hover {
        background-color: var(--logo-dark-color);
      }

      :active {
        transform: scale(0.9);
      }
    }
  }

  .edit-cancel {
    animation: disappear 0.6s;
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
  clickLike,
  handleDelete,
  id,
}) => {
  const currentUser = useAuth();

  useEffect(() => {}, []);

  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectId, setSelectId] = useState();
  const [animation, setAnimation] = useState("");
  const [feedContAnimation, setFeedContAnimation] =
    useState("fc__open-animation");

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
      }, 500);
    }
  }

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

  // 피드 좋아요 버튼 클릭
  async function clickLike(id) {
    setLike(!like);

    try {
      const docRef = doc(myFirestore, "feeds", id);
      const docSnap = await getDoc(docRef);
      let prevLike = docSnap.data().like;

      // prevLike.forEach((uid, index) => {
      //   console.log(index, +" " + uid);

      //   if (uid === currentUser.uid) {
      //     alert("이미존재합니다");
      //   }

      // });

      const isLike = prevLike.includes(currentUser.uid);

      // like 배열에 나의 uid가 있으면 (좋아요한 상태)
      if (isLike) {
        console.log("좋아요 누른 게시물");
        // like 배열에 나의 uid 삭제
        prevLike.forEach((uid, index) => {
          if (uid === currentUser.uid) {
            prevLike.splice(index, 1);
            console.log(prevLike);
          }
        });
        const payload = {
          like: prevLike,
        };
        updateDoc(docRef, payload);
      } else {
        console.log("좋아요 안누른 게시물");

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

  // 리트윅 버튼 클릭
  async function clickReTwixx(id) {
    try {
      const docRef = doc(myFirestore, "feeds", id);
      const docSnap = await getDoc(docRef);
      let prevReTwixx = docSnap.data().reTwixx;

      await updateDoc(docRef, { reTwixx: prevReTwixx + 1 });
    } catch (e) {
      console.log(e.code);
      alert(e.message);
    }
  }

  // 컬럼 삭제 테스트
  async function clickShare(id) {
    alert("컬럼 삭제 테스트");
    try {
      const docRef = doc(myFirestore, "feeds", "new");
      await deleteField(docRef);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <FeedContStyle>
      <div className={`feed__container ${feedContAnimation}`}>
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
              {likeCount}
            </span>
            <span className="bm__icon">
              <FontAwesomeIcon icon={faBookmark} title="북마크" />
            </span>
            <span className="cm__icon">
              <FontAwesomeIcon icon={faComment} title="댓글" />
            </span>
            <span className="rp__icon" onClick={() => clickReTwixx(id)}>
              <FontAwesomeIcon icon={faRepeat} title="리트윅" />
              {reTwixxCount}
            </span>
            <span className="sr__icon">
              <FontAwesomeIcon
                icon={faShareFromSquare}
                onClick={() => clickShare(id)}
                title="공유"
              />
            </span>
          </div>
        </div>
      </div>
      {edit && (
        <EditContainerStyle>
          <div className="wrapper-st">
            <div className={`edit__container ${animation}`}>
              <textarea
                className="prev-content"
                value={editContent}
                onChange={handleEditContent}
              />
              <button onClick={editConfirm}>수정하기</button>
              <button onClick={editCancel}>취소</button>
            </div>
          </div>
        </EditContainerStyle>
      )}
    </FeedContStyle>
  );
};

export default FeedContainer;
