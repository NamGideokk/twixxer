import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login, loginGoogle, useAuth } from "myFirebase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignUp from "components/SignUp";
import Loading from "common/Loading";
import { useNavigate } from "react-router-dom";

const AuthStyle = styled.div`
  form {
    max-width: 450px;
    width: 85%;
    height: fit-content;
    padding: 30px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .logo__icon {
      color: var(--logo-color);
      font-size: 50px;
      position: absolute;
      transform: translate(-30px, -140px);
    }

    .logo {
      position: absolute;
      transform: translateY(-100px);
      padding-left: 10px;
      max-width: 100%;
      width: 85%;
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

    .login__button {
      width: 100%;
      height: 40px;
      font-size: 18px;
      background-color: var(--logo-color);
      color: white;
      transition: 0.3s;

      :hover {
        background-color: var(--logo-dark-color);
      }
    }

    .btn__wrapper {
      margin-top: 40px;
      text-align: center;
    }

    .button__st {
      width: 100%;
      background-color: transparent;
      padding: 5px;
      border: none;
      cursor: pointer;
      font-size: 16px;
      transition: 0.3s;
    }

    .google {
      color: white;
      border-radius: 10px;
      padding: 5px 10px;

      small {
        :nth-of-type(1) {
          color: #5189f1;
        }
        :nth-of-type(2) {
          color: #e0433a;
        }
        :nth-of-type(3) {
          color: #f5ba29;
        }
        :nth-of-type(4) {
          color: #5189f1;
        }
        :nth-of-type(5) {
          color: #49a757;
        }
        :nth-of-type(6) {
          color: #e0433a;
          margin-right: 10px;
        }
      }
    }
    .google-font {
      font-size: 16px;
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
    color: black;

    :hover {
      background-color: var(--logo-dark-color);
    }
  }

  @media screen and (max-width: 414px) {
    .google {
      font-size: 14px !important;
    }
  }
`;

const Auth = () => {
  const currentUser = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState("none");
  const [animation, setAnimation] = useState("fec__open-animation");

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
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

  function signUpModal(e) {
    const {
      target: { name },
    } = e;

    if (name === "showSignUp") {
      setDisplay("block");
      setTimeout(() => {
        setAnimation("");
      }, 500);
    } else if (name === "closeSignUp") {
      setAnimation("fec__close-animation");
      setTimeout(() => {
        setDisplay("none");
        setAnimation("fec__open-animation");
      }, 500);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
                minLength={6}
                value={password}
                onChange={onChange}
                required
              />
              <button
                className="login__button"
                type="submit"
                disabled={loading}
              >
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
                  className="button__st1"
                  onClick={signUpModal}
                >
                  이메일 주소로 간편 가입하기
                </button>
              </div>
            </form>
          </AuthStyle>
          <SignUp
            display={display}
            signUpModal={signUpModal}
            animation={animation}
          />
        </>
      )}
    </>
  );
};

export default Auth;
