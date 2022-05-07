import { updateProfile } from "firebase/auth";
import { useAuth } from "myFirebase";
import React, { useState } from "react";
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
    padding: 30px 20px;
    background-color: rgba(30, 30, 30, 0.8);
    border-radius: 20px;
    transition: 0.3s;
    text-align: center;

    h2 {
      color: #eeeeee;
      margin-bottom: 40px;
    }
    p {
      color: #eeeeee;
      margin-bottom: 20px;
    }

    form {
      input {
        width: 100%;
        padding: 10px 10px;
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
  }
`;

const SetName = () => {
  const currentUser = useAuth();

  const [name, setName] = useState("");
  const [display, setDisplay] = useState();
  const [animation, setAnimation] = useState("");

  function handleName(e) {
    setName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await updateProfile(currentUser, {
        displayName: name,
      });

      alert("이름이 성공적으로 변경되었습니다.");
      setAnimation("fec__close-animation");

      setTimeout(() => {
        setDisplay("none");
        setAnimation("");
      }, 500);
    } catch (e) {
      alert(e.message);
      console.log(e.code);
    }
  }

  return (
    <SetNameStyle>
      <div className="wrapper-st" style={{ display: display }}>
        <div className={`inner ${animation} `}>
          <h2>🎉 가입을 축하합니다! 🎉</h2>
          <p>
            이름을 설정하세요 <small>( 2 ~ 8자 )</small>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={handleName}
              minLength={2}
              maxLength={8}
              required
            />
            <button>확인</button>
          </form>
        </div>
      </div>
    </SetNameStyle>
  );
};

export default SetName;
