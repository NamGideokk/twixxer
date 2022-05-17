import React from "react";
import styled from "styled-components";

const MessageListStyle = styled.div`
  .list__wrapper {
    max-width: 300px;
    min-width: 150px;
    height: 100vh;
    background-color: beige;

    .list__item {
      width: 100%;
      height: 110px;
      background-color: var(--logo-dark-color);
      padding: 15px;
      display: grid;
      grid-template-columns: 80px 1fr;
      grid-template-rows: 1.5fr 30px;
      grid-template-areas:
        "li01 li02"
        "li01 li03";
      cursor: pointer;
      transition: 0.3s;

      :hover {
        background-color: var(--logo-color);
      }
      :active {
        transform: scale(0.95);
      }

      .li01 {
        grid-area: li01;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .li02 {
        grid-area: li02;
        padding: 0 10px;
        padding-top: 5px;

        p {
          color: #323232;
        }
      }

      .li03 {
        grid-area: li03;
        line-height: 30px;
        padding: 0 10px;

        p {
          width: 170px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
`;

const MessageList = () => {
  return (
    <MessageListStyle>
      <div className="list__wrapper">
        <div className="list__item">
          <div className="li01">
            <img
              src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
              alt="avatar"
            />
          </div>
          <div className="li02">
            <h2>아이유</h2>
            <p>iu_official@gmail.com</p>
          </div>
          <div className="li03" title="inner text">
            <p>안녕하세요 반갑습니다!!!!!</p>
          </div>
        </div>
      </div>
    </MessageListStyle>
  );
};

export default MessageList;
