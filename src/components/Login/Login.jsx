import React from "react";
import "./Login.scss";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login, loginGoogle, useAuth } from "myFirebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ signUpModal }) => {
  const currentUser = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000);
    } else if (currentUser === null && currentUser !== undefined) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [currentUser]);

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
      navigate("/");
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
        navigate("/");
      }
    } catch (e) {
      console.log(e.code);
      alert(e.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="login__form">
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
        minLength={6}
        value={password}
        onChange={onChange}
        required
      />
      <button className="login__button" type="submit" disabled={loading}>
        {loading ? "로그인중..." : "로그인"}
      </button>
      <div className="btn__wrapper">
        <button
          name="google"
          type="button"
          className="button__st google"
          onClick={socialClick}
        >
          <small className="google-font">G</small>
          <small className="google-font">o</small>
          <small className="google-font">o</small>
          <small className="google-font">g</small>
          <small className="google-font">l</small>
          <small className="google-font">e</small>
          계정으로 로그인
        </button>
      </div>
      <div className="last__wrapper">
        <button
          name="showSignUp"
          className="secondary-button"
          onClick={signUpModal}
        >
          이메일 주소로 간편 가입하기
        </button>
      </div>
    </form>
  );
};

export default Login;
