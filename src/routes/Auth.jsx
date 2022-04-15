import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  authService,
  signUp,
  login,
  useAuth,
  loginGoogle,
  loginGithub,
} from "myFirebase";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SignUp from "components/SignUp";

const AuthStyle = styled.div`
  form {
    width: 420px;
    height: fit-content;
    padding: 30px;
    background-color: #d1c4e9;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);

    .logo__icon {
      color: var(--logo-color);
      font-size: 50px;
      position: absolute;
      transform: translate(-40px, -180px);
    }

    .logo {
      position: absolute;
      transform: translateY(-150px);
    }

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

    input[type="submit"] {
      cursor: pointer;
      background-color: var(--logo-color);
      color: white;
      border: none;
    }

    .btn__wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .button__st {
      width: fit-content;
      background-color: transparent;
      padding: 5px;
      border: none;
      cursor: pointer;
      font-size: 14px;
    }

    .brand__icon {
      margin-right: 5px;
      color: purple;
    }
  }

  .last__wrapper {
    margin-top: 10px;
  }

  .button__st1 {
    font-size: 18px;
    width: 100%;
    padding: 10px 0;
    background-color: var(--logo-color);
  }
`;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [display, setDisplay] = useState("none");

  const currentUser = useAuth();
  const navi = useNavigate();

  // 여러개의 input onChange를 하나의 함수로 처리하기
  function onChange(e) {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      // 두번째 인자값 replace에 true값을 줄 경우 이전 페이지로 뒤로 가기 할수 없음 (기본값 false)
      navi("/", { replace: true });
    } catch (e) {
      console.log(e.code, e.message);
      alert(e.message);
    }
  }

  async function socialClick(e) {
    const {
      target: { name },
    } = e;

    try {
      if (name === "google") {
        await loginGoogle();
        navi("/", { replace: true });
      } else if (name === "github") {
        await loginGithub();
        navi("/", { replace: true });
      }
    } catch (e) {
      console.log(e.code, e.message);
      alert(e.message);
    }
  }

  function signUpModal(e) {
    const {
      target: { name },
    } = e;

    if (name === "showSignUp") {
      setDisplay("block");
    } else if (name === "closeSignUp") {
      setDisplay("none");
    }
  }

  return (
    <>
      <AuthStyle>
        <form onSubmit={onSubmit}>
          <FontAwesomeIcon icon={faTwitter} className="logo__icon" />
          <img
            src={process.env.PUBLIC_URL + "/imgs/twixxer_logo.png"}
            alt="logo"
            className="logo"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
            required
          />
          <input type="submit" value="로그인" />
          <div className="btn__wrapper">
            <button
              name="google"
              type="button"
              className="button__st"
              onClick={socialClick}
            >
              <FontAwesomeIcon icon={faGoogle} className="brand__icon" />
              Google 계정으로 로그인
            </button>
            <button
              name="github"
              type="button"
              className="button__st"
              onClick={socialClick}
            >
              <FontAwesomeIcon icon={faGithub} className="brand__icon" />
              Github 계정으로 로그인
            </button>
          </div>
          <div className="last__wrapper">
            <button
              name="showSignUp"
              className="button__st1"
              onClick={signUpModal}
            >
              이메일 주소로 간편 가입하기
            </button>
          </div>
        </form>
      </AuthStyle>
      <SignUp display={display} signUpModal={signUpModal} />
    </>
  );
};

export default Auth;
