import React, { useState } from "react";
import "./SignUp.scss";
import { myFirestore, signUp } from "myFirebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setActiveUser } from "reduxStore/user/userSlice";

const SignUp = ({ signUpModal, animation }) => {
  const navitage = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  // email, password 각 입력값 state에 할당
  function handleInput(e) {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  }

  // 회원가입 버튼 클릭
  function handleSignUp(e) {
    e.preventDefault();

    try {
      signUp(email, password).then((auth) => {
        console.log(auth.user);
        dispatch(
          setActiveUser({
            displayName: name,
            email,
            photoURL: auth.user.photoURL,
            uid: auth.user.uid,
          })
        );
      });
      // const collectionRef = collection(myFirestore, "users", "hi");
      // const payload = {
      //   uid: "hi",
      //   userName: null,
      //   userId: email,
      //   photo: null,
      //   timestamp: Timestamp.fromDate(new Date()),
      //   language: "KOR",
      // };
      // await addDoc(collectionRef, payload);
      navitage("/");
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setErrorText("사용 중인 이메일입니다. 다른 이메일을 입력해 주세요.");
      } else if (e.code === "auth/weak-password") {
        setErrorText("비밀번호는 6자 이상 입력해 주세요.");
      } else if (e.code === "auth/invalid-email") {
        setErrorText("양식을 모두 입력해 주세요.");
      }
    }
  }
  return (
    <div className="outside">
      <form className={`signup__wrapper ${animation}`} onSubmit={handleSignUp}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleInput}
          value={email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInput}
          value={password}
          required
        />
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleInput}
          value={name}
          required
        />
        <p className="error-text">{errorText}</p>

        <button type="submit" className="submitBtn" disabled={loading}>
          {loading ? "회원가입중..." : "회원가입"}
        </button>
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
  );
};

export default SignUp;
