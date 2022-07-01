import React, { useState } from "react";
import styled from "styled-components";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { myFirestore } from "myFirebase";
import "./ReplyContainer.scss";

const EditContainerStyle = styled.div`
  .edit__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    width: 90vw;
    height: 400px;
    padding: 40px 20px;
    background-color: rgba(30, 30, 30, 0.8);
    border-radius: 20px;
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
        border: 1px solid var(--logo-dark-color);
      }
    }

    button {
      margin-top: 20px;
      width: 40%;
      font-size: 20px;
      background-color: var(--logo-color);
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
  .like-ani-action {
    animation: like-animation 2s;
  }
  .re-twixx-animation {
    animation: rotation 1s;
  }
`;

// id = 타겟(상위) 글의 id (중복됨), replyId = 댓글 id (중복X)
const ReplyContainer = ({
  id,
  replyId,
  currentUserEmail,
  avatar,
  name,
  email,
  content,
  createdAt,
  editAt,
}) => {
  const [replyContAnimation, setReplyContAnimation] =
    useState("fc__open-animation");
  const [editModal, setEditModal] = useState(false);
  const [animation, setAnimation] = useState("");
  const [editContent, setEditContent] = useState("");
  const [getReplyId, setGetReplyId] = useState();

  // 댓글 수정 모달
  async function handleEditModal(replyId) {
    setGetReplyId(replyId);
    setEditModal(!editModal);
    setAnimation("fec__open-animation");
    setTimeout(() => {
      setAnimation("");
    }, 500);

    const docRef = doc(myFirestore, "replys", replyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEditContent(docSnap.data().content);
    }
  }

  // 댓글 내용 핸들
  function handleEditContent(e) {
    setEditContent(e.target.value);
  }

  // 댓글 수정 확인
  async function editConfirm() {
    const docRef = doc(myFirestore, "replys", getReplyId);
    const payload = {
      content: editContent,
      createdAt: Date(),
      editAt: "수정됨",
    };

    if (editContent.length === 0) {
      alert("내용을 입력해주세요");
    } else {
      await updateDoc(docRef, payload);
      modalClose();
    }
  }

  function editCancel() {
    modalClose();
  }

  function modalClose() {
    setAnimation("fec__close-animation");
    setTimeout(() => {
      setEditModal(!editModal);
      setAnimation("");
    }, 500);
  }

  // 댓글 삭제
  function handleDelete(replyId) {
    console.log("댓글 id - ", replyId);
  }

  return (
    <>
      <div className={`reply__container ${replyContAnimation}`}>
        <div className="rc-01">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="rc-02">
          <p>{name}</p>
          <p>{email}</p>
        </div>
        <div className="rc-03">
          {email === currentUserEmail && (
            <>
              <FontAwesomeIcon
                icon={faCirclePlus}
                className="edit__button"
                onClick={() => handleEditModal(replyId)}
              />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="delete__button"
                onClick={() => handleDelete(replyId)}
              />
            </>
          )}
        </div>
        <div className="rc-04">{content}</div>
        <div className="rc-05">
          <small>
            {createdAt}　{editAt}
          </small>
        </div>
      </div>

      {editModal && (
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
    </>
  );
};

export default ReplyContainer;
