import React from "react";
import styled from "styled-components";

const MessageListStyle = styled.div`
  .list__wrapper {
    width: 100%;
    height: 150px;
    /* background-color: beige; */
    display: flex;

    .list__item {
      width: 110px;
      height: 150px;
      /* background-color: var(--logo-dark-color); */
      padding: 10px 15px;
      text-align: center;
      cursor: pointer;
      transition: 0.3s;

      :hover {
        background-color: var(--logo-color);
      }
      :active {
        transform: scale(0.95);
      }

      .li01 {
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .li02 {
        text-align: center;

        h3 {
          color: white;
        }

        p {
          color: #323232;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 80px;
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
            <h3>아이유</h3>
            <p title="iu_official@gmail.com">iu_official@gmail.com</p>
          </div>
        </div>
        <div className="list__item">
          <div className="li01">
            <img
              src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
              alt="avatar"
            />
          </div>
          <div className="li02">
            <h3>아이유</h3>
            <p title="iu_official@gmail.com">iu_official@gmail.com</p>
          </div>
        </div>
      </div>
    </MessageListStyle>
  );
};

export default MessageList;
