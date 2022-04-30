import React from "react";
import styled from "styled-components";

const EditModalStyle = styled.div`
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

const EditModal = () => {
  return (
    <EditModalStyle>
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
    </EditModalStyle>
  );
};

export default EditModal;
