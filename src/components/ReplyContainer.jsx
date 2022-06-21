import React, { useState } from "react";
import styled from "styled-components";
import { faCirclePlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { myFirestore } from "myFirebase";

const ReplyContainerStyle = styled.div`
  .reply__container {
    width: 90%;
    height: fit-content;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 60px 1fr 50px;
    grid-template-rows: 45px 1fr 20px;
    grid-template-areas:
      "rc-01 rc-02 rc-03"
      "rc-01 rc-04 rc-04"
      "rc-01 rc-05 rc-05";
    color: #dcdcdc;
    border: 1px solid #404040;
    background-color: #222222;

    .rc-01 {
      grid-area: rc-01;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .rc-02 {
      grid-area: rc-02;
      padding: 0 20px;

      p {
        :nth-of-type(1) {
          font-weight: bold;
          font-size: 1.25rem;
        }
        :nth-of-type(2) {
          font-size: 0.9rem;
          color: #717171;
        }
      }
    }
    .rc-03 {
      grid-area: rc-03;
      text-align: right;

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
    }
    .rc-04 {
      grid-area: rc-04;
      padding: 5px 20px;
    }
    .rc-05 {
      grid-area: rc-05;
      padding: 0 20px;

      small {
        color: #b0b0b0;
      }
    }
  }

  @media screen and (max-width: 820px) {
    .reply__container {
      width: 100%;
      padding: 0.625rem;
    }
  }

  @media screen and (max-width: 414px) {
    .reply__container {
      width: 100%;
      grid-template-columns: 60px 1fr 42px;
    }
    .rc-01 {
      img {
        width: 50px !important;
        height: 50px !important;
      }
    }
  }
`;

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
      <ReplyContainerStyle>
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
      </ReplyContainerStyle>

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
