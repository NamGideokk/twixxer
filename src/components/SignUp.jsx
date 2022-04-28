import React, { useState } from "react";
import styled from "styled-components";
import { signUp } from "myFirebase";

const SignUpStyle = styled.div`
  .outside {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);

    position: absolute;
    top: 0;
    left: 0;
  }
  .signup__wrapper {
    width: 450px;
    height: 327px;
    padding: 30px;
    background-color: rgb(30, 30, 30);
    backdrop-filter: blur(30px);
    border-radius: 20px;

    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);

    input {
      width: 100%;
      height: 40px;
      font-size: 18px;
      padding: 0 10px;
      margin-bottom: 10px;
      border: 1px solid white;
      transition: 0.3s;

      :focus {
        border: 1px solid var(--logo-color);
      }
    }
    .submitBtn {
      width: 100%;
      height: 40px;
      font-size: 18px;
      background-color: var(--logo-color);
      color: white;
      margin-bottom: 10px;
      transition: 0.3s;

      :hover {
        background-color: var(--logo-dark-color);
      }
    }
  }

  .back-login {
    width: 100%;
    font-size: 18px;
    padding: 10px 0;
    background-color: var(--logo-color);
    margin-top: 70px;
    transition: 0.3s;

    :hover {
      background-color: var(--logo-dark-color);
    }
  }

  .error-text {
    color: #ff3232;
    font-size: 16px;
    position: absolute;
  }
`;

const SignUp = ({ display, signUpModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [animation, setAnimation] = useState("fec__open-animation");

  function handleInput(e) {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    setLoading(true);
    try {
      await signUp(email, password);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setErrorText(
          "이미 사용중인 이메일입니다. 다른 이메일을 입력해 주세요."
        );
      } else if (e.code === "auth/weak-password") {
        setErrorText("비밀번호는 6자 이상 입력해 주세요.");
      } else if (e.code === "auth/invalid-email") {
        setErrorText("양식을 모두 입력해 주세요.");
      }
    }
    setLoading(false);
  }
  return (
    <SignUpStyle>
      <div className="outside" style={{ display: display }}>
        <form
          className={`signup__wrapper ${animation}`}
          onSubmit={handleSignUp}
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInput}
            value={email}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInput}
            value={password}
          />
          <button type="submit" className="submitBtn" disabled={loading}>
            {loading ? "회원가입중..." : "회원가입"}
          </button>
          <p className="error-text">{errorText}</p>

          <button
            name="closeSignUp"
            type="button"
            className="back-login"
            onClick={signUpModal}
          >
            로그인으로 돌아가기
          </button>
        </form>
      </div>
    </SignUpStyle>
  );
};

export default SignUp;
