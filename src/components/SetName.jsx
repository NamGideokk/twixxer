import React from "react";
import styled from "styled-components";

const SetNameStyle = styled.div`
  .inner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    width: fit-content;
    height: fit-content;
    padding: 40px 20px;
    background-color: rgba(30, 30, 30, 0.8);
    border-radius: 20px;
    transition: 0.3s;
    text-align: center;

    h2 {
      color: #eeeeee;
      margin-bottom: 10px;
    }
    p {
      color: #eeeeee;
      margin-bottom: 20px;
    }

    form {
      input {
        width: 100%;

        padding: 10px 10px;
        margin-bottom: 30px;
      }

      button {
        position: absolute;
        background: none;
        transform: translate(-60px, 7px);
        width: 20%;
        font-size: 18px;
        padding: 3px 0;
      }
    }

    .later {
      font-size: 22px;
      color: #b2b2b2;
      background: none;
      transition: 0.3s;

      :hover {
        color: white;
      }
    }
  }
`;

const SetName = ({ handleClose, animation }) => {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <SetNameStyle>
      <div className="wrapper-st">
        <div className={`inner ${animation} `}>
          <h2>🎉 가입을 축하합니다! 🎉</h2>
          <p>이름을 설정하세요</p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="이름" />
            <button>확인</button>
          </form>
          <button className="later" onClick={handleClose}>
            다음에 할래요
          </button>
        </div>
      </div>
    </SetNameStyle>
  );
};

export default SetName;
