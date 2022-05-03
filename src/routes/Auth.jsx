import {
  faGithub,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login, loginGoogle, loginGithub } from "myFirebase";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SignUp from "components/SignUp";

const AuthStyle = styled.div`
  form {
    width: 450px;
    height: fit-content;
    padding: 30px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);

    .logo__icon {
      color: var(--logo-color);
      font-size: 50px;
      position: absolute;
      transform: translate(-30px, -170px);
    }

    .logo {
      position: absolute;
      transform: translateY(-130px);
      padding-left: 10px;
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

      :hover {
        background-color: var(--logo-dark-color);
      }
    }

    .btn__wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .button__st {
      width: fit-content;
      background-color: transparent;
      padding: 5px;
      border: none;
      cursor: pointer;
      font-size: 14px;
      transition: 0.3s;
    }

    .google,
    .github {
      background-color: white;
      border-radius: 10px;
      padding: 5px 10px;
    }

    .brand__icon {
      margin-right: 5px;
      color: purple;
    }
  }

  .last__wrapper {
    margin-top: 20px;
  }

  .button__st1 {
    font-size: 18px;
    width: 100%;
    padding: 10px 0;
    background-color: var(--logo-color);
    transition: 0.3s;

    :hover {
      background-color: var(--logo-dark-color);
    }
  }
`;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("none");

  const emailInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
  }, []);

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

    setLoading(true);
    try {
      await login(email, password);
      // 두번째 인자값 replace에 true값을 줄 경우 이전 페이지로 뒤로 가기 할수 없음 (기본값 false)
    } catch (e) {
      console.log(e.code);
      if (e.code === "auth/user-not-found") {
        alert("존재하지 않는 이메일 입니다.");
      } else if (e.code === "auth/wrong-password") {
        alert("비밀번호가 맞지 않습니다.");
      } else if (e.code === "auth/too-many-requests") {
        alert("너무 많은 접속 시도를 하였습니다. 잠시 후 다시 시도하세요.");
      }
    }
    setLoading(false);
  }

  async function socialClick(e) {
    const {
      target: { name },
    } = e;

    try {
      if (name === "google") {
        await loginGoogle();
      } else if (name === "github") {
        await loginGithub();
      }
    } catch (e) {
      console.log(e.code);
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
      setTimeout(() => {
        setDisplay("none");
      }, 500);
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
            ref={emailInput}
            value={email}
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            minLength={6}
            value={password}
            onChange={onChange}
            required
          />
          <input
            type="submit"
            value={loading ? "로그인중..." : "로그인"}
            disabled={loading}
          />
          <div className="btn__wrapper">
            <button
              name="google"
              type="button"
              className="button__st google"
              onClick={socialClick}
            >
              <FontAwesomeIcon icon={faGoogle} className="brand__icon" />
              Google 계정으로 로그인
            </button>
            <button
              name="github"
              type="button"
              className="button__st github"
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
