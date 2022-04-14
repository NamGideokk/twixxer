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

const AuthStyle = styled.div`
  form {
    width: 420px;
    height: fit-content;
    padding: 30px;
    background-color: #d1c4e9;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

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

  const currentUser = useAuth();

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
      await signUp(email, password);
    } catch (e) {
      console.log(e.code, e.message);
      alert(e.message);
    }
  }

  function socialClick(e) {
    const {
      target: { name },
    } = e;

    if (name === "google") {
      loginGoogle();
    } else if (name === "github") {
      loginGithub();
    }
  }

  return (
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
          <button className="button__st1">이메일 주소로 간편 가입하기</button>
        </div>
      </form>
    </AuthStyle>
  );
};

export default Auth;
