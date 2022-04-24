import React from "react";
import styled from "styled-components";

const FeedMenuModalStyle = styled.div`
  .menu-modal__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
  }
  .menu-modal {
    width: fit-content;
    height: fit-content;
    padding: 20px;
    background-color: var(--logo-light-color);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;

    animation: showing 0.3s;

    li {
      cursor: pointer;
      margin: 5px 0;
      transition: 0.3s;
      padding: 5px 20px;

      :hover {
        color: white;
        background-color: var(--logo-color);
      }
    }
  }
`;

const FeedMenuModal = ({ handleUpdate, handleDelete, handleCancel }) => {
  return (
    <FeedMenuModalStyle>
      <div className="menu-modal__wrapper">
        <ul className="menu-modal">
          <li onClick={handleUpdate}>수정하기</li>
          <li onClick={handleDelete}>삭제하기</li>
          <li onClick={handleCancel}>돌아가기</li>
        </ul>
      </div>
    </FeedMenuModalStyle>
  );
};

export default FeedMenuModal;
